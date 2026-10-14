import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage, serviceLandingHead } from "@/components/services/ServiceLandingPage";
import { getServiceLanding } from "@/content/service-landings";

const service = getServiceLanding("eng-reversa");
export const Route = createFileRoute("/eng-reversa")({
  head: () => serviceLandingHead(service),
  component: () => <ServiceLandingPage service={service} />,
});
