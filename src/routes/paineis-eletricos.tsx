import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage, serviceLandingHead } from "@/components/services/ServiceLandingPage";
import { getServiceLanding } from "@/content/service-landings";

const service = getServiceLanding("paineis-eletricos");
export const Route = createFileRoute("/paineis-eletricos")({
  head: () => serviceLandingHead(service),
  component: () => <ServiceLandingPage service={service} />,
});
