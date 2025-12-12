"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero_image from "@/public/images/partoLogo2.png";
import Image from "next/image";


gsap.registerPlugin(ScrollTrigger);

export default function DemoOne({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen flex flex-col relative bg-gray-200 items-center justify-center overflow-hidden"
    >
      {/* ANIMATING CONTENT */}
      <div
        ref={contentRef}
        className="mt-16 rounded-4xl w-[92vw] h-[88vh] overflow-hidden
                   flex flex-col items-center justify-center
                   relative shadow-md will-change-transform z-10"
      >
        {/* ✅ VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Primary (Chrome / Edge / Firefox) */}
          <source
            src="/videos/synthetic-hero-background.webm"
            type="video/webm"
          />

          {/* ✅ Fallback (Safari / iOS) */}
          <source
            src="/videos/synthetic-hero-background.mp4"
            type="video/mp4"
          />
        </video>

        {/* ✅ FOREGROUND CONTENT */}
        <div className="relative z-50 flex flex-col items-center text-center px-6">
          <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-8 md:gap-4">
            <Image src={hero_image} alt="hero image" width={200} />
            <h1
              className="irsans_bold text-6xl md:text-8xl font-black bg-linear-to-t from-[#5E55FF] to-black bg-clip-text text-transparent max-w-4xl pb-4"
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
