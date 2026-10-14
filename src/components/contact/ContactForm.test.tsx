import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

vi.mock("./ContactChallenge", () => ({ ContactChallenge: ({ onToken }: { onToken: (token: string) => void }) => <button type="button" onClick={() => onToken("test-token")}>Verificar</button> }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
function fill() {
  for (const [id, value] of Object.entries({ name: "Pessoa Teste", email: "pessoa@example.test", phone: "21999991234", subject: "Novo projeto", message: "Gostaria de conversar sobre um novo projeto." })) {
    fireEvent.change(document.getElementById(`contact-${id}`)!, { target: { value } });
  }
}
function setup(result: Response | Promise<Response> = Response.json({ ok: true })) {
  const fetcher = vi.fn<typeof fetch>().mockResolvedValueOnce(Response.json({ siteKey: "public-test-key" })).mockReturnValueOnce(Promise.resolve(result));
  vi.stubGlobal("fetch", fetcher);
  render(<ContactForm />);
  return fetcher;
}
async function verify() { fireEvent.click(await screen.findByText("Verificar")); }

describe("Contact form", () => {
  it("validates on client and focuses the first invalid field", async () => {
    const fetcher = setup(); await verify();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(await screen.findByText(/Informe seu nome/)).toBeInTheDocument();
    expect(document.activeElement?.id).toBe("contact-name");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("shows pending then success only after the endpoint confirms", async () => {
    let complete!: (value: Response) => void;
    setup(new Promise(resolve => { complete = resolve; })); fill(); await verify();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(screen.getByRole("button", { name: /Enviando/ })).toBeDisabled();
    expect(screen.queryByText(/Mensagem enviada!/)).not.toBeInTheDocument();
    complete(Response.json({ ok: true }));
    expect(await screen.findByText(/Mensagem enviada!/)).toBeInTheDocument();
    expect(document.getElementById("contact-message")).toHaveValue("");
  });
  it("retains input and shows error when the server fails", async () => {
    setup(Response.json({ ok: false, message: "Serviço temporariamente indisponível." }, { status: 502 })); fill(); await verify();
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(await screen.findByText("Serviço temporariamente indisponível.")).toBeInTheDocument();
    expect(screen.queryByText(/Mensagem enviada!/)).not.toBeInTheDocument();
    expect(document.getElementById("contact-message")).toHaveValue("Gostaria de conversar sobre um novo projeto.");
  });
  it("handles lost connections without displaying success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce(Response.json({ siteKey: "test-key" })).mockRejectedValueOnce(new TypeError("Failed to fetch")));
    render(<ContactForm />);
    fill(); await verify(); fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(await screen.findByText(/Não foi possível confirmar o envio/)).toBeInTheDocument();
  });
  it("disables sending when server configuration is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ siteKey: null })));
    render(<ContactForm />);
    expect(await screen.findByText(/O formulário está indisponível/)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Enviar mensagem" })).toBeDisabled());
  });

  it("shows errors only after blur and clears them immediately on correction", () => {
    setup();
    const email = document.getElementById("contact-email")!;
    const phone = document.getElementById("contact-phone")!;
    expect(screen.queryByText("Informe um e-mail válido.")).not.toBeInTheDocument();
    expect(screen.queryByText("Informe um telefone brasileiro válido com DDD.")).not.toBeInTheDocument();
    fireEvent.change(email, { target: { value: "incompleto@" } });
    fireEvent.change(phone, { target: { value: "23999999999" } });
    expect(email).toHaveAttribute("aria-invalid", "false");
    expect(phone).toHaveAttribute("aria-invalid", "false");
    fireEvent.blur(email);
    fireEvent.blur(phone);
    expect(screen.getByText("Informe um e-mail válido.")).toHaveAttribute("id", "error-email");
    expect(email).toHaveAttribute("aria-describedby", "error-email");
    expect(phone).toHaveAttribute("aria-describedby", "error-phone");
    expect(phone).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveValue("incompleto@");
    expect(phone).toHaveValue("23999999999");
    fireEvent.change(email, { target: { value: "ana+projeto@example.org" } });
    fireEvent.change(phone, { target: { value: "(11) 3333-4444" } });
    expect(screen.queryByText("Informe um e-mail válido.")).not.toBeInTheDocument();
    expect(screen.queryByText("Informe um telefone brasileiro válido com DDD.")).not.toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "false");
    expect(phone).not.toHaveAttribute("aria-describedby");
  });

  it("blocks invalid e-mail and phone on submit, preserving input and focusing the first error", async () => {
    const fetcher = setup(); fill(); await verify();
    const email = document.getElementById("contact-email")!;
    const phone = document.getElementById("contact-phone")!;
    fireEvent.change(email, { target: { value: "pessoa@" } });
    fireEvent.change(phone, { target: { value: "23999999999" } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(screen.getByText("Informe um telefone brasileiro válido com DDD.")).toBeInTheDocument();
    expect(document.activeElement).toBe(email);
    expect(fetcher).toHaveBeenCalledTimes(1);
    fireEvent.change(email, { target: { value: "ana@example.org" } });
    expect(email).toHaveAttribute("aria-invalid", "false");
    expect(phone).toHaveValue("23999999999");
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(document.activeElement).toBe(phone);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it.each(["(11) 3333-4444", "+55 (21) 99999-9999"])("preserves the successful sending flow for %s", async phone => {
    const fetcher = setup(); fill(); await verify();
    fireEvent.change(document.getElementById("contact-email")!, { target: { value: "  ana+projeto@example.org  " } });
    fireEvent.change(document.getElementById("contact-phone")!, { target: { value: phone } });
    fireEvent.click(screen.getByRole("button", { name: "Enviar mensagem" }));
    expect(await screen.findByText(/Mensagem enviada!/)).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(2);
    const payload = JSON.parse(fetcher.mock.calls[1]?.[1]?.body as string);
    expect(payload.email).toBe("ana+projeto@example.org");
    expect(payload.phone).toBe(phone);
    expect(payload.token).toBe("test-token");
    expect(payload.submissionId).toEqual(expect.any(String));
  });
});
