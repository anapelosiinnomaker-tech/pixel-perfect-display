import { createFileRoute } from "@tanstack/react-router";
import { ServiceLandingPage, serviceLandingHead } from "@/components/services/ServiceLandingPage";
import { getServiceLanding } from "@/content/service-landings";

const service = getServiceLanding("prototipagem");
export const Route = createFileRoute("/prototipagem")({
  head: () => serviceLandingHead(service),
  component: () => <ServiceLandingPage service={service} />,
});
