

import React, { useLayoutEffect, useRef } from 'react';
import SyntheticHero from "@/components/synthetic-hero";
// Note: In a real Next.js app, you might need to import these dynamically
// or ensures this component is marked with 'use client'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DemoOne() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // useLayoutEffect(() => {
  //   // GSAP Context for clean React integration
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(contentRef.current,
  //       {
  //         width: '92vw',
  //         height: '88vh',
  //         borderRadius: 32,
  //       },
  //       {
  //         // Target state (full screen)
  //         width: '100vw',
  //         height: '100vh',
  //         borderRadius: 0,
  //         ease: 'none', // Linear is best for scroll scrubbing
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: 'top top', // Start when top of container meets top of viewport
  //           end: '+=100%',   // Duration of the pinning (100% of viewport height)
  //           pin: true,       // Pin the container while animating
  //           scrub: true,     // Smoothly link animation to scroll position
  //           // markers: true // Uncomment to see debug markers
  //         },
  //       });
  //   }, containerRef);

  //   return () => ctx.revert(); // Cleanup on unmount
  // }, []);

  return (
      <div
        ref={containerRef}
        className="w-screen h-screen flex flex-col relative bg-white items-center justify-center overflow-hidden"
      >
        {/* ANIMATING CONTENT - The element that expands */}
        {/* Note: Removed native translation/margin classes that might fight GSAP centering */}
        <div
          ref={contentRef}
          className="mt-16 rounded-4xl w-[92vw] h-[88vh] overflow-hidden flex flex-col items-center justify-center relative shadow-md will-change-transform z-10"
        >
          <SyntheticHero
            title="پرتو جی شید"
            description=""
          />
          {/* Parto Jeyshid */}
        </div>
      </div>
  );
}