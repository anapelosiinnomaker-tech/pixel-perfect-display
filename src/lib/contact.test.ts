import { describe, expect, it } from "vitest";
import { contactFieldsSchema } from "./contact";

describe("Contact e-mail validation", () => {
  it.each([
    "ana@example.com", "ana.silva+projetos@engenharia.example.com.br",
    "ana@empresa.technology", "o'connor@example.org",
  ])("accepts a valid e-mail: %s", email => {
    expect(contactFieldsSchema.shape.email.safeParse(email).success).toBe(true);
  });

  it("trims whitespace without changing the address", () => {
    expect(contactFieldsSchema.shape.email.parse("  Ana+projeto@example.org  ")).toBe("Ana+projeto@example.org");
  });

  it.each([
    "", "ana", "ana@", "@example.com", "ana@example", "ana@@example.com",
    "ana silva@example.com", "ana@exa mple.com", "ana..silva@example.com",
    ".ana@example.com", "ana@example..com", "ana@example.com\nBcc:other@example.com",
  ])("rejects an incomplete or malformed e-mail: %s", email => {
    expect(contactFieldsSchema.shape.email.safeParse(email).success).toBe(false);
  });
});

describe("Brazilian phone validation", () => {
  it.each([
    "(21) 99999-9999", "21999999999", "21 99999-9999",
    "(11) 3333-4444", "1133334444",
    "+55 (21) 99999-9999", "+5521999999999",
    "+55 (11) 3333-4444", "  (21) 99999-1234  ",
    "5533334444", "55999991234",
    "6123456789", "9941234567", "28987654321",
  ])("accepts fixed and mobile numbers with or without formatting: %s", phone => {
    expect(contactFieldsSchema.shape.phone.safeParse(phone).success).toBe(true);
  });

  it.each([
    "", "999999999", "219999999", "219999999999", "113333444",
    "00999999999", "23999999999", "25999999999", "52999999999", "72999999999",
    "1111111111", "11111111111", "99999999999", "+55 (99) 99999-9999",
    "2100000000", "2112345678", "21812345678", "2191234567",
    "+1 (21) 99999-9999", "+54 (11) 3333-4444", "5521999999999",
    "21abc999999999", "21 99999.9999", "21/99999-9999",
    "21+999999999", "++5521999999999", "21\t999999999",
  ])("rejects invalid, incomplete or foreign numbers: %s", phone => {
    expect(contactFieldsSchema.shape.phone.safeParse(phone).success).toBe(false);
  });
});