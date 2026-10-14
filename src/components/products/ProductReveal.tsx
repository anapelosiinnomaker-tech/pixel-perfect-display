import { useEffect, useRef, type ReactNode } from "react";

/** Page-local entrance; content stays visible with no JS or reduced motion. */
export function ProductReveal({ children, className }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = element.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!target || preference.matches || !("IntersectionObserver" in window) || !target.animate) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!preference.matches) animation = target.animate(
        [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 550, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", fill: "backwards" },
      );
      observer.disconnect();
    }, { threshold: 0.08 });
    const stopMotion = () => { if (preference.matches) { observer.disconnect(); animation?.cancel(); } };
    preference.addEventListener("change", stopMotion);
    observer.observe(target);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener("change", stopMotion); };
  }, []);
  return <div ref={element} className={className}>{children}</div>;
}
