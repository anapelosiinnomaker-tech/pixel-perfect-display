import { z } from "zod";

const singleLine = (max: number) => z.string().trim().max(max, `Use no máximo ${max} caracteres.`).refine(value => !/[\r\n\u0000-\u001f\u007f]/.test(value), "Use apenas uma linha de texto.");

export const contactFieldsSchema = z.object({
  name: singleLine(100).refine(value => value.length >= 2, "Informe seu nome (mínimo de 2 caracteres)."),
  email: singleLine(254).pipe(z.string().email("Informe um e-mail válido.")),
  company: singleLine(150),
  phone: singleLine(30).refine(value => /^[+()\d\s.-]+$/.test(value) && value.replace(/\D/g, "").length >= 8 && value.replace(/\D/g, "").length <= 15, "Informe um telefone válido com DDD."),
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
