// app/page.tsx
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
import { useSiteConfig } from "@/hooks/useSiteConfig";

export default function Home() {
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: config,
    isLoading: configLoading,
    isError,
    error,
  } = useSiteConfig();

  // Extend loading if config is still loading
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

    // Wait for minimum time, fonts, AND config
    Promise.all([minTimePromise, contentLoadPromise]).then(() => {
      if (!configLoading) {
        setIsLoading(false);
      }
    });
  }, [configLoading]);

  // Hide loading screen when everything is ready
  useEffect(() => {
    if (!isLoading && loadingScreenRef.current) {
      gsap.to(loadingScreenRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    }
  }, [isLoading]);

  // Cursor effect
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

  // Show error if failed to load config
  if (isError) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 flex-col gap-8 px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">خطا در بارگذاری سایت</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          متاسفانه در حال حاضر امکان بارگذاری اطلاعات سایت وجود ندارد.
          <br />
          لطفاً لحظاتی بعد دوباره تلاش کنید.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="text-sm text-red-400 bg-gray-900 p-4 rounded-lg mt-4 overflow-auto">
            {error?.message || "Unknown error"}
          </pre>
        )}
      </div>
    );
  }

  // Show loading screen until config is ready
  if (isLoading || !config) {
    return (
      <div
        ref={loadingScreenRef}
        className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
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
    );
  }

  // Main content — now using real data
  return (
    <div
      className="overflow-x-hidden bg-gray-200"
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
          mixBlendMode: "difference",
        }}
        className="hidden md:flex"
      >
        <svg width="30" height="30">
          <circle cx="15" cy="15" r="14" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <Navbar input={config.navbar} />
      <DemoOne title={config.title} />
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
        <HeroSectionDemo input={config.about} />
        <Slider input={config.projects} />
        <div className="bg-[linear-gradient(35deg,rgb(229_231_235)_35%,rgb(230,230,230)_72%,rgb(255,255,255)_100%)]">
          <div className="bg-transparent w-full flex justify-center items-center -translate-y-12">
            <ProjectStats input={config.stats} />
          </div>
          <Services input={config.services} />
        </div>
        <div className="bg-[linear-gradient(135deg,rgb(229_231_235)_32%,rgb(255,255,255)_100%)]">
          <Lodge input={config.lodge} />
          <MainLodgeProjects />
        </div>
        <div className="bg-[linear-gradient(95deg,rgb(229_231_235)_-10%,rgb(250,250,250)_100%)]">
          <News />
          <Licenses input={config.licenses} />
        </div>
      </div>
      <Footer input={config.footer} />
    </div>
  );
}