import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5, // How long the "glide" lasts
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Physical easing function
      direction: "vertical",
      gestureDirection: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1, // Sensitivity
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with the browser's requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // This component just runs the logic
}