"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Slider() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  // const images = [
  //   { name: "پروژه سرو", projectUrl: "#", imageUrl: "./images/Slide1.jpg" },
  //   {
  //     name: "استخر دانشگاه علوم پزشکی",
  //     projectUrl: "#",
  //     imageUrl: "./images/Slide10.jpg",
  //   },
  //   {
  //     name: "مرکز همایش های بین المللی اصفهان",
  //     projectUrl: "#",
  //     imageUrl: "./images/Slide11.jpg",
  //   },
  //   {
  //     name: "استخر دانشگاه علوم پزشکی",
  //     projectUrl: "#",
  //     imageUrl: "./images/Slide12.jpg",
  //   },
  //   {
  //     name: "استخر دانشگاه علوم پزشکی",
  //     projectUrl: "#",
  //     imageUrl: "./images/Slide13.jpg",
  //   },
  //   {
  //     name: "مرکز همایش های بین المللی اصفهان",
  //     projectUrl: "#",
  //     imageUrl: "./images/Slide14.jpg",
  //   },
  //   {
  //     name: "مرکز همایش های بین المللی اصفهان",
  //     projectUrl: "#",
  //     imageUrl: "./images/Slide16.jpg",
  //   },
  //   { name: "کوثر 2", projectUrl: "#", imageUrl: "./images/slide20.png" },
  // ];

  const row1_images = [
    {
      name: "مرکز همایش های بین المللی اصفهان",
      projectUrl: "projects/ejlas",
      imageUrl: "./images/projects/ejlas/ejlas10.jpg",
    },
    {
      name: "مرکز همایش های بین المللی اصفهان",
      projectUrl: "projects/ejlas",
      imageUrl: "./images/Slide7.jpg",
    },
    {
      name: "مرکز همایش های بین المللی اصفهان",
      projectUrl: "projects/ejlas",
      imageUrl: "./images/projects/ejlas/ejlas11.jpg",
    },
    {
      name: "مرکز همایش های بین المللی اصفهان",
      projectUrl: "projects/ejlas",
      imageUrl: "./images/Slide6.jpg",
    },
    {
      name: "مرکز همایش های بین المللی اصفهان",
      projectUrl: "projects/ejlas",
      imageUrl: "./images/Slide16.jpg",
    },
  ];

  const row2_images = [
    {
      name: "استخر دانشگاه علوم پزشکی",
      projectUrl: "#",
      imageUrl: "./images/projects/pool/pool_11.jpg",
    },
    {
      name: "مجموعه فرهنگی حسین آباد",
      projectUrl: "#",
      imageUrl: "./images/projects/culture/culture_2.jpg",
    },
    {
      name: "پروژه کوثر 2",
      projectUrl: "#",
      imageUrl: "./images/projects/kousar2/kousar_4.jpg",
    },
    {
      name: "مرکز رشد و فناوری دانشگاه صنعتی",
      projectUrl: "#",
      imageUrl: "./images/projects/grTech/GrTech_4.jpg",
    },
    { name: "کوثر 2", projectUrl: "#", imageUrl: "./images/slide20.png" },
  ];

  const row3_images = [
    {
      name: "مجموعه فرهنگی حسین آباد",
      projectUrl: "#",
      imageUrl: "./images/Slide1.jpg",
    },
    {
      name: "مرکز رشد و فناوری دانشگاه صنعتی",
      projectUrl: "#",
      imageUrl: "./images/projects/grTech/GrTech_1.jpg",
    },
    {
      name: "استخر دانشگاه علوم پزشکی",
      projectUrl: "#",
      imageUrl: "./images/Slide12.jpg",
    },
    {
      name: "زمین ورزشی غرب",
      projectUrl: "#",
      imageUrl: "./images/projects/sportsField/4.jpg",
    },
    {
      name: "مجموعه فرهنگی حسین آباد",
      projectUrl: "#",
      imageUrl: "./images/Slide1.jpg",
    },
    { name: "کوثر 2", projectUrl: "#", imageUrl: "./images/slide20.png" },
  ];

  useEffect(() => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.error(
        "GSAP or ScrollTrigger is not loaded. Please ensure their CDN scripts are included or they are installed in your project."
      );
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const animateRow = (rowRef, direction) => {
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
      existingClones.forEach((clone) => clone.remove());

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
    };

    animateRow(row1Ref, "left-to-right");
    animateRow(row2Ref, "right-to-left");
    animateRow(row3Ref, "left-to-right");

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
    };
  }, []);

  const CarouselItem = ({ src, alt }) => {
    const nameRef = useRef(null);

    const handleMouseMove = (e) => {
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
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/300x200/cccccc/white?text=Error";
          }}
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

  return (
    <div className="flex flex-col items-center justify-center font-sans gap-0 iransans_med">
      <div className="pointer-events-none absolute top-0 left-0 z-50 opacity-0">
        <img src={"/logos/scrollItemView.svg"} />
      </div>

      <div className="w-full overflow-hidden mb-2">
        <div
          ref={row1Ref}
          className="flex flex-row items-center whitespace-nowrap will-change-transform"
        >
          <div className="carousel-content-container flex">
            {row1_images.map((src, index) => (
              <CarouselItem
                key={`row1-${index}`}
                src={src}
                alt={`Row 1 Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden mb-2">
        <div
          ref={row2Ref}
          className="flex flex-row-reverse items-center whitespace-nowrap will-change-transform"
        >
          <div className="carousel-content-container flex">
            {row2_images.map((src, index) => (
              <CarouselItem
                key={`row2-${index}`}
                src={src}
                alt={`Row 2 Image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={row3Ref}
          className="flex flex-row items-center whitespace-nowrap will-change-transform"
        >
          <div className="carousel-content-container flex">
            {row3_images.map((src, index) => (
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
