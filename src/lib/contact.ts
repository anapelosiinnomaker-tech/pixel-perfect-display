import { z } from "zod";

const singleLine = (max: number) => z.string().trim().max(max, `Use no máximo ${max} caracteres.`).refine(value => !/[\r\n\u0000-\u001f\u007f]/.test(value), "Use apenas uma linha de texto.");

// Brazilian area codes; normalization does not depend on a visual input mask.
const brazilianAreaCodes = new Set([
  "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "21", "22", "24", "27", "28",
  "31", "32", "33", "34", "35", "37", "38",
  "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "51", "53", "54", "55",
  "61", "62", "63", "64", "65", "66", "67", "68", "69",
  "71", "73", "74", "75", "77", "79",
  "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "91", "92", "93", "94", "95", "96", "97", "98", "99",
]);

function isBrazilianPhone(value: string): boolean {
  // Only an explicit +55 is a country prefix. Never strip a foreign prefix.
  if (!/^(?:\+55)?[0-9 ()-]+$/.test(value)) return false;
  const national = value.replace(/^\+55/, "").replace(/[ ()-]/g, "");
  if (!/^[0-9]{10,11}$/.test(national) || /^(\d)\1+$/.test(national)) return false;
  if (!brazilianAreaCodes.has(national.slice(0, 2))) return false;
  const subscriber = national.slice(2);
  return /^[2-5][0-9]{7}$/.test(subscriber) || /^9[0-9]{8}$/.test(subscriber);
}

export const contactFieldsSchema = z.object({
  name: singleLine(100).refine(value => value.length >= 2, "Informe seu nome (mínimo de 2 caracteres)."),
  email: singleLine(254).pipe(z.string().email("Informe um e-mail válido.")),
  company: singleLine(150),
  phone: singleLine(30).refine(isBrazilianPhone, "Informe um telefone brasileiro válido com DDD."),
  subject: singleLine(150).refine(value => value.length >= 3, "Informe o assunto (mínimo de 3 caracteres)."),
  message: z.string().trim().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.").max(5000, "Use no máximo 5.000 caracteres.").refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value), "A mensagem contém caracteres inválidos."),
});

export const contactRequestSchema = contactFieldsSchema.extend({
  website: z.string().max(0),
  token: z.string().min(1).max(2048),
  submissionId: z.string().uuid(),
}).strict();

export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export type ContactResult = { ok: true } | { ok: false; message: string; errors?: ContactErrors };

export function fieldErrors(error: z.ZodError): ContactErrors {
  const result: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactFields;
    if (key in contactFieldsSchema.shape && !result[key]) result[key] = issue.message;
  }
  return result;
}
