"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: String;
  projectUrl: String;
  imageUrl: String;
}

interface Input {
  row1?: Project[];
  row2?: Project[];
  row3?: Project[];
}

const CarouselItem = ({ src , alt }: { src: any , alt: any }) => {
    const nameRef = useRef(null);

    const handleMouseMove = (e: any) => {
      const itemRect = e.currentTarget.getBoundingClientRect();
      const centerX = itemRect.left + itemRect.width / 2;
      const centerY = itemRect.top + itemRect.height / 2;

      const offsetX = (e.clientX - centerX) * 0.1;
      const offsetY = (e.clientY - centerY) * 0.1;

      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: offsetX,
          y: offsetY,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (nameRef.current) {
        gsap.to(nameRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      }
    };

    return (
      <div
        className="relative shrink-0 w-96 h-60 rounded-lg overflow-hidden shadow-lg mx-1 group bg-white"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={src.imageUrl}
          alt={src.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] text-white text-xl group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-lg">
          <span
            ref={nameRef}
            className="irsans_med will-change-transform text-center px-4"
          >
            {src.name}
          </span>
        </span>
      </div>
    );
  };

export default function Slider({ input }: { input: Input }) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.error(
        "GSAP or ScrollTrigger is not loaded. Please ensure their CDN scripts are included or they are installed in your project."
      );
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const animateRow = (rowRef: any, direction: any) => {
      const row = rowRef.current;
      if (!row) return;

      const contentContainer = row.querySelector(".carousel-content-container");
      if (!contentContainer) {
        console.error("Carousel content container not found for ref:", rowRef);
        return;
      }

      if (row.scrollTrigger) {
        row.scrollTrigger.kill();
      }

      const existingClones = row.querySelectorAll(".cloned-content");
      existingClones.forEach((clone: any) => clone.remove());

      const numClones = 4;
      for (let i = 0; i < numClones; i++) {
        const clonedContent = contentContainer.cloneNode(true);
        clonedContent.classList.add("cloned-content");
        row.appendChild(clonedContent);
      }

      const originalContentWidth = contentContainer.scrollWidth;
      const animationDistance = originalContentWidth * 5;

      let xAnimationTarget;
      if (direction === "left-to-right") {
        xAnimationTarget = -animationDistance / 12;
      } else {
        xAnimationTarget = animationDistance / 12;
      }

      const animation = gsap.to(row, {
        x: xAnimationTarget,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x) => {
            let val = parseFloat(x);
            return val % originalContentWidth;
          }),
        },
      });

      row.scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=3000",
        scrub: true,
        animation: animation,
        invalidateOnRefresh: true,
      });

      // Add drag functionality
      let isDragging = false;
      let startClientX = 0;
      let startX = 0;
      let startProgress = 0;

      const onPointerDown = (e: any) => {
        if (e.button && e.button !== 0) return; // Left click only
        row.scrollTrigger.disable();
        animation.pause();
        isDragging = true;
        startClientX = e.touches ? e.touches[0].clientX : e.clientX;
        startX = gsap.getProperty(row, "x") as number;
        startProgress = row.scrollTrigger.progress;
        e.preventDefault();
      };

      const onPointerMove = (e: any) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = clientX - startClientX;
        const newX = startX + delta;
        gsap.set(row, { x: newX });
        if (e.touches) e.preventDefault();
      };

      const onPointerUp = (e: any) => {
        if (!isDragging) return;
        isDragging = false;
        const currentX = gsap.getProperty(row, "x") as number;

        // Kill old animation and ScrollTrigger
        animation.kill();
        row.scrollTrigger.kill();

        // Calculate new start and end for animation
        const newStartX = currentX - startProgress * xAnimationTarget;
        const newEndX = newStartX + xAnimationTarget;

        // Create new animation
        const newAnimation = gsap.to(row, {
          x: newEndX,
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((x) => {
              let val = parseFloat(x);
              return val % originalContentWidth;
            }),
          },
        });

        // Create new ScrollTrigger
        row.scrollTrigger = ScrollTrigger.create({
          trigger: document.body,
          start: "top top",
          end: "+=3000",
          scrub: true,
          animation: newAnimation,
          invalidateOnRefresh: true,
        });
      };

      row.addEventListener("mousedown", onPointerDown);
      row.addEventListener("touchstart", onPointerDown, { passive: false });
      document.addEventListener("mousemove", onPointerMove);
      document.addEventListener("touchmove", onPointerMove, { passive: false });
      document.addEventListener("mouseup", onPointerUp);
      document.addEventListener("touchend", onPointerUp);
      document.addEventListener("touchcancel", onPointerUp);

      return () => {
        row.removeEventListener("mousedown", onPointerDown);
        row.removeEventListener("touchstart", onPointerDown);
        document.removeEventListener("mousemove", onPointerMove);
        document.removeEventListener("touchmove", onPointerMove);
        document.removeEventListener("mouseup", onPointerUp);
        document.removeEventListener("touchend", onPointerUp);
        document.removeEventListener("touchcancel", onPointerUp);
      };
    };

    const cleanup1 = animateRow(row1Ref, "left-to-right");
    const cleanup2 = animateRow(row2Ref, "right-to-left");
    const cleanup3 = animateRow(row3Ref, "left-to-right");

    return () => {
      if (typeof gsap !== "undefined") {
        gsap.killTweensOf([row1Ref.current, row2Ref.current, row3Ref.current]);
      }
      if (typeof ScrollTrigger !== "undefined") {
        if (row1Ref.current && row1Ref.current.scrollTrigger)
          row1Ref.current.scrollTrigger.kill();
        if (row2Ref.current && row2Ref.current.scrollTrigger)
          row2Ref.current.scrollTrigger.kill();
        if (row3Ref.current && row3Ref.current.scrollTrigger)
          row3Ref.current.scrollTrigger.kill();
      }
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
      cleanup3 && cleanup3();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center font-sans gap-0 iransans_med">
      <div className="w-full overflow-hidden mb-2">
        <div
          ref={row1Ref}
          className="flex flex-row items-center whitespace-nowrap will-change-transform"
        >
          <div className="carousel-content-container flex">
            {input.row1!.map((src, index) => (
              <CarouselItem
                key={`row1-${index}`}
                src={src}
                alt={`Row 1 Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div className="w-full overflow-hidden mb-2">
        <div
          ref={row2Ref}
          className="flex flex-row-reverse items-center whitespace-nowrap will-change-transform"
        >
          <div className="carousel-content-container flex">
            {input.row2.map((src: any, index: any) => (
              <CarouselItem
                key={`row2-${index}`}
                src={src}
                alt={`Row 2 Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div> */}

      <div className="w-full overflow-hidden">
        <div
          ref={row3Ref}
          className="flex flex-row items-center whitespace-nowrap will-change-transform"
        >
          <div className="carousel-content-container flex">
            {input.row2!.map((src: any, index: any) => (
              <CarouselItem
                key={`row3-${index}`}
                src={src}
                alt={`Row 3 Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}