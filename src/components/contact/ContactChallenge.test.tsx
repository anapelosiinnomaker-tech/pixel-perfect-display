import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ContactChallenge } from "./ContactChallenge";

afterEach(() => { cleanup(); delete window.turnstile; vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it("uses compact verification on small phones and adapts when resized", async () => {
  let width = 280;
  let resized!: () => void;
  const disconnect = vi.fn();
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => width);
  vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { resized = callback; } observe() {} disconnect = disconnect; });
  const renderWidget = vi.fn().mockReturnValue("widget-id");
  const remove = vi.fn();
  window.turnstile = { render: renderWidget, remove };
  const onToken = vi.fn();
  const view = render(<ContactChallenge siteKey="public-key" onToken={onToken} onFailure={vi.fn()} />);
  await waitFor(() => expect(renderWidget).toHaveBeenCalledOnce());
  expect(renderWidget.mock.calls[0]?.[1]).toMatchObject({ size: "compact", action: "contact" });
  width = 600;
  resized();
  expect(renderWidget.mock.calls[1]?.[1]).toMatchObject({ size: "flexible" });
  expect(remove).toHaveBeenCalledWith("widget-id");
  expect(onToken).toHaveBeenCalledWith("");
  view.unmount();
  expect(disconnect).toHaveBeenCalledOnce();
});
