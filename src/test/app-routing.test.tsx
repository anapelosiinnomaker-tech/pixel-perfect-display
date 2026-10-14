import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { nav, serviceCatalog } from "@/content/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("opens the internal Sobre page from the shared navigation", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const aboutLink = nav.find((item) => item.label === "Sobre");

    expect(aboutLink?.href).toBe("/sobre");
    expect(router.matchRoutes(aboutLink!.href).at(-1)?.routeId).toBe("/sobre");
  });
  it("opens the internal Contato page from the shared navigation", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const contactLink = nav.find(item => item.label === "Contato");
    expect(contactLink?.href).toBe("/contato");
    expect(router.matchRoutes(contactLink!.href).at(-1)?.routeId).toBe("/contato");
  });
  it("opens product development from the existing service catalog", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const product = serviceCatalog.flatMap(category => category.items).find(item => item.title === "Desenvolvimento de produtos");
    expect(product?.href).toBe("/des-de-produtos");
    expect(router.matchRoutes(product!.href).at(-1)?.routeId).toBe("/des-de-produtos");
  });
});
