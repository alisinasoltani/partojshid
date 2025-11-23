"use client";

import HeroSectionDemo from "@/components/about";
import DemoOne from "@/components/hero2";
import Slider from "@/components/ProjecsSlider";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ProjectStats from "@/components/Stats";
import Services from "@/components/Services";
import News from "@/components/News";
import Licenses from "@/components/Licenses";
import Lodge from "@/components/Lodge";
import MainLodgeProjects from "@/components/MainLodgeProjects";
import Image from "next/image";

export default function Home() {
  // const svgCursorRef = useRef(null);
  // const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const loadingScreenRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Promise 1: The minimum display time (3 seconds)
    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 4000);
    });

    // Promise 2: The content (fonts, window.load) is ready
    const contentLoadPromise = new Promise<void>((resolve) => {
      const handleLoad = () => resolve();

      // Use document.fonts.ready for fonts
      const checkFonts = () => {
        document.fonts.ready.then(handleLoad).catch(handleLoad);
      };

      // Check if the page is already loaded
      if (document.readyState === "complete") {
        checkFonts();
      } else {
        // Wait for the window to load all initial assets
        window.addEventListener("load", checkFonts, { once: true });
      }
    });

    // Wait for BOTH promises to resolve
    Promise.all([minTimePromise, contentLoadPromise]).then(() => {
      // Both the 3-second timer and the content loading are done
      setIsLoading(false);
    });

    // No cleanup function is strictly needed here because
    // the 'load' event is { once: true } and the promises
    // will only resolve once.

  }, []); // Empty array ensures this runs only once on mount

  useEffect(() => {
    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 3000);
    });

    const contentLoadPromise = new Promise<void>((resolve) => {
      const handleLoad = () => resolve();
      const checkFonts = () => {
        document.fonts.ready.then(handleLoad).catch(handleLoad);
      };
      if (document.readyState === "complete") {
        checkFonts();
      } else {
        window.addEventListener("load", checkFonts, { once: true });
      }
    });

    Promise.all([minTimePromise, contentLoadPromise]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Animate the loading screen out
      gsap.to(loadingScreenRef.current, {
        opacity: 0,
        duration: 0.5, // Animation duration in seconds
        ease: "power2.inOut",
        pointerEvents: "none", // Makes the div non-interactive after animating
      });
    }
  }, [isLoading]); // This effect runs whenever 'isLoading' changes

  useEffect(() => {
    if (isLoading) return;

    const el = cursorRef.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isLoading]);

  return (
    <>
      {/* This is the loading screen. It's now *always* rendered,
        so GSAP has a permanent target to animate.
        It starts visible by default.
      */}
      <div
        ref={loadingScreenRef}
        className="fixed inset-0 bg-black flex items-center justify-center z-200 overflow-hidden"
      >
        <video
          className="w-full md:w-[40vw] lg:w-[20vw] object-cover"
          autoPlay
          loop
          muted
          controls={false}
          src="/videos/logo.mp4"
        />
      </div>

      {/* This is your main page content.
        We apply the visibility style here instead.
      */}
      <div
        className="overflow-x-hidden bg-white"
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "30px",
            height: "30px",
            pointerEvents: "none",
            zIndex: 999,
            willChange: "transform",
            mixBlendMode: "difference", // 👈 magic
          }}
          className="hidden md:flex"
        >
          <svg width="30" height="30">
            <circle
              cx="15"
              cy="15"
              r="14"
              fill="none"
              stroke="white" // base stroke color
              strokeWidth="1"
            />
          </svg>
        </div>
        <Navbar />
        <DemoOne />
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bg_path.png"
              fill
              alt="Background"
              className="w-full h-full object-cover -translate-y-120 opacity-65"
              priority={true}
            />
          </div>
          <HeroSectionDemo />
          <Slider />
          <div className="bg-[linear-gradient(35deg,rgb(230,230,230)_35%,rgb(250,250,250)_72%,rgb(255,255,255)_100%)]">
            <div className="bg-transparent w-full flex justify-center items-center -translate-y-12">
              <ProjectStats />
            </div>
            <Services />
          </div>
          <div className="bg-[linear-gradient(135deg,rgb(230,230,230)_32%,rgb(250,250,250)_100%)]">
            <Lodge />
            <MainLodgeProjects />
          </div>
          <div className="bg-[linear-gradient(95deg,rgb(230,230,230)_-10%,rgb(250,250,250)_100%)]">
            <News />
            <Licenses />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
