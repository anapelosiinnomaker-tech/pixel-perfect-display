import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage, serviceLandingHead } from "@/components/services/ServiceLandingPage";
import { getServiceLanding } from "@/content/service-landings";

const service = getServiceLanding("mapeamento-de-processos");
export const Route = createFileRoute("/mapeamento-de-processos")({
  head: () => serviceLandingHead(service),
  component: () => <ServiceLandingPage service={service} />,
});
