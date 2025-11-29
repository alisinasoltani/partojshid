"use client";

import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  name: string;
  number: number;
  url: string;
}

interface Input {
  title: string;
  stats: Stat[];
}

interface StatItem {
  title: string;
  count: number;
  url: string;
  id: string;
}

const StatItem = ({ title, count, id, url }: StatItem) => (
  <div className="flex flex-row-reverse items-center justify-center gap-4 md:gap-6">
    <span
      id={id}
      className="text-6xl md:text-8xl irsans_bold text-black flex items-center">
      {count}
    </span>

    <div className="flex flex-col items-end justify-center gap-3">
      <h3 className="text-lg md:text-xl irsans_med text-gray-800">
        {title}
      </h3>
      <Link href={url}>
        <button
          style={{ backgroundColor: "#5E55FF" }}
          className="flex flex-row-reverse items-center gap-2 rounded-full px-4 py-1.5 text-sm irsans_reg text-white transition-transform hover:scale-105">
          <span>مشاهده همه</span>
          <ArrowLeft size={16} />
        </button>
      </Link>
    </div>
  </div>
);

export default function ProjectStats({ input }: { input: Input }) {
  const containerRef = useRef(null);

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
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        startCount1();
        startCount2();
        startCount3();
      },
      onLeaveBack: () => {
        resetCount1();
        resetCount2();
        resetCount3();
      },
    });

    return () => {
      trigger.kill();
    };
  }, [startCount1, startCount2, startCount3, resetCount1, resetCount2, resetCount3]);

  return (
    <div
      ref={containerRef}
      className="w-[60vw] md:w-full max-w-4xl rounded-2xl border border-gray-200/50 bg-gray-200/20 p-6 pr-12 shadow-lg backdrop-blur-lg md:p-8">
      <h2 className="mb-6 text-right text-3xl irsans_med text-black">
        {input.title}
      </h2>

      <div className="flex flex-col-reverse items-end md:items-center justify-between gap-8 md:flex-row-reverse md:gap-4 md:divide-x-reverse md:divide-gray-300/70">
        {
          input.stats.map((stat, index) => (
            <div className="flex-1" key={index}>
              <StatItem title={stat.name} count={stat.number} id={`countup-${index + 1}`} url={stat.url} />
            </div>
          ))
        }
      </div>
    </div>
  );
}