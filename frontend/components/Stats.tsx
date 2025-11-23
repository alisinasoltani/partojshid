"use client";

import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Helper component for each stat item
const StatItem = ({
  title,
  count,
  id,
}: {
  title: string;
  count: number;
  id: string;
}) => (
  <div className="flex flex-row-reverse items-center justify-center gap-4 md:gap-6">
    {/* Animated Number */}
    <span
      id={id} // The ID for react-countup to target
      className="text-6xl md:text-8xl irsans_bold text-black flex items-center"
    >
      0 {/* Initial value */}
    </span>

    {/* Text content & Button */}
    <div className="flex flex-col items-end justify-center gap-3">
      <h3 className="text-lg md:text-xl irsans_med text-gray-800">
        {title}
      </h3>
      <button
        style={{ backgroundColor: "#5E55FF" }}
        className="flex flex-row-reverse items-center gap-2 rounded-full px-4 py-1.5 text-sm irsans_reg text-white transition-transform hover:scale-105"
      >
        <span>مشاهده همه</span>
        <ArrowLeft size={16} />
      </button>
    </div>
  </div>
);

// Main Component
export default function ProjectStats() {
  const containerRef = useRef(null);

  // Setup hooks for each counter
  // We set startOnMount: false and trigger them manually with GSAP
  const { start: startCount1, reset: resetCount1 } = useCountUp({
    end: 5,
    duration: 2.5,
    startOnMount: false,
    ref: "countup-1",
  });

  const { start: startCount2, reset: resetCount2 } = useCountUp({
    end: 5,
    duration: 2.5,
    startOnMount: false,
    ref: "countup-2",
  });

  const { start: startCount3, reset: resetCount3 } = useCountUp({
    end: 2,
    duration: 2.5,
    startOnMount: false,
    ref: "countup-3",
  });

  useEffect(() => {
    // GSAP ScrollTrigger setup
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%", // Trigger when the top of the element hits 80% from the top of the viewport
      onEnter: () => {
        // Start all counters when component enters
        startCount1();
        startCount2();
        startCount3();
      },
      onLeaveBack: () => {
        // Reset counters when scrolling back up
        resetCount1();
        resetCount2();
        resetCount3();
      },
    });

    // Cleanup function to remove the trigger on component unmount
    return () => {
      trigger.kill();
    };
  }, [startCount1, startCount2, startCount3, resetCount1, resetCount2, resetCount3]);

  return (
    // Use a 'min-h-[50vh]' or similar on the parent page to test scrolling
    <div
      ref={containerRef}
      // Main container with backdrop blur and rounded edges
      className="w-[60vw] md:w-full max-w-4xl rounded-2xl border border-gray-200/50 bg-gray-200/20 p-6 pr-12 shadow-lg backdrop-blur-lg md:p-8"
    >
      {/* Title */}
      <h2 className="mb-6 text-right text-3xl irsans_med text-black">
        پروژه ها
      </h2>

      {/* Stats Container */}
      <div className="flex flex-col-reverse items-end md:items-center justify-between gap-8 md:flex-row-reverse md:gap-4 md:divide-x-reverse md:divide-gray-300/70">
        {/* Item 1 */}
        <div className="flex-1">
          <StatItem title="راه و ترابری" count={5} id="countup-1" />
        </div>

        {/* Item 2 */}
        <div className="flex-1 md:pr-4 border-0 md:border-r border-gray-300">
          <StatItem title="تاسیسات و تجهیزات" count={5} id="countup-2" />
        </div>

        {/* Item 3 */}
        <div className="flex-1 md:pr-4 border-0 md:border-r border-gray-300">
          <StatItem title="ساختمان و ابنیه" count={2} id="countup-3" />
        </div>
      </div>
    </div>
  );
}