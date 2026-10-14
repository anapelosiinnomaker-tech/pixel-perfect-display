import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage, serviceLandingHead } from "@/components/services/ServiceLandingPage";
import { getServiceLanding } from "@/content/service-landings";

const service = getServiceLanding("automacao-de-processos");
export const Route = createFileRoute("/automacao-de-processos")({
  head: () => serviceLandingHead(service),
  component: () => <ServiceLandingPage service={service} />,
});
