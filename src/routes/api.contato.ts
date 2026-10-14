import { createFileRoute } from "@tanstack/react-router";
import { createContactHandler } from "@/server/contact-handler.server";
import { getContactEnv } from "@/server/contact-env.server";

const handle = createContactHandler(getContactEnv);
export const Route = createFileRoute("/api/contato")({
  server: { handlers: { GET: ({ request }) => handle(request), POST: ({ request }) => handle(request) } },
});
