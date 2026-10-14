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
});
