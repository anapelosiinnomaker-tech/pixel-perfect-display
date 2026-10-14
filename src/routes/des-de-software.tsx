import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage, serviceLandingHead } from "@/components/services/ServiceLandingPage";
import { getServiceLanding } from "@/content/service-landings";

const service = getServiceLanding("des-de-software");
export const Route = createFileRoute("/des-de-software")({
  head: () => serviceLandingHead(service),
  component: () => <ServiceLandingPage service={service} />,
});
