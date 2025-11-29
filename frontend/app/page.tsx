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

const main_page_json = {
  "title": "پرتو جی شید",
  "navbar": {
    "logo": "/images/favicon.ico",
    "about": {
      "title": "درباره ما",
      "menu_items": [
        {
          "title": "در یک نگاه",
          "description": "",
          "url": "#"
        },
        {
          "title": "",
          "description": "تاریخچه",
          "url": "#"
        },
        {
          "title": "استراتژی",
          "description": "",
          "url": "#"
        },
        {
          "title": "مدیریت",
          "description": "",
          "url": "#"
        }
      ],
      "url": ""
    },
    "activities": {
      "title": "فعالیت ها",
      "menu_items": [
        {
          "title": "طراحی و اجرا",
          "description": "اجرای پروژه‌های ساختمانی از صفر تا صد.",
          "url": "#"
        },
        {
          "title": "پروژه های پیش فروش",
          "description": "پیش فروش پروژه های در حال ساخت گروه ساختمانی لژ.",
          "url": "#"
        },
        {
          "title": "پروژه های فعال",
          "description": "پرتو جی شید با فعالیت در زمینه های ابنیه و تاسیسات در حال ادامه فعالیت های خود می باشد.",
          "url": "#"
        },
        {
          "title": "مشارکت در ساخت",
          "description": "گروه ساختمانی لژ",
          "url": "#"
        }
      ],
      "url": ""
    },
    "projects": {
      "title": "پروژه ها",
      "menu_items": [],
      "url": ""
    },
    "lodge": {
      "title": "کروه ساختمانی لژ",
      "menu_items": [],
      "url": ""
    },
    "contact": {
      "title": "تماس با ما",
      "menu_items": [],
      "url": ""
    }
  },
  "about": {
    "title": "درباره ما",
    "description": "شرکت مهندسی پرتو جی شید با بیش از 20 سال سابقه و با نیت خدمت و کمک به عمران و آبادانی کشور و با بکارگیری پرسنل مجرب و توانمند در زمینه پروژه های عمرانی با موضوع ابنیه ، تاسیسات ، راه و ترابری و آب و فاضلاب مشغول به فعالیت می باشد و در راستای اجرای سیستم مدیریت یکپارچه (IMS) و همچنین سیستم مدیریت کیفیت پروژه ISO 10006 اهداف خود را به ثمر می رساند.",
    "subitle": [
      "+20 سال فعالیت حرفه ای",
      "+12 پروژه عمرانی تحویل شده با ارزش بیش 100 از میلیارد ریال در سطح کشور و استان اصفهان"
    ],
    "image": "/images/ejlas.jpg"
  },
  "projects": {
    "row1": [
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/projects/ejlas/ejlas10.jpg"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/Slide7.jpg"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/projects/ejlas/ejlas11.jpg"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/Slide6.jpg"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/Slide16.jpg"
      }
    ],
    "row2": [
      {
        "name": "استخر دانشگاه علوم پزشکی",
        "projectUrl": "#",
        "imageUrl": "./images/projects/pool/pool_11.jpg"
      },
      {
        "name": "مجموعه فرهنگی حسین آباد",
        "projectUrl": "#",
        "imageUrl": "./images/projects/culture/culture_2.jpg"
      },
      {
        "name": "پروژه کوثر 2",
        "projectUrl": "#",
        "imageUrl": "./images/projects/kousar2/kousar_4.jpg"
      },
      {
        "name": "مرکز رشد و فناوری دانشگاه صنعتی",
        "projectUrl": "#",
        "imageUrl": "./images/projects/grTech/GrTech_4.jpg"
      },
      {
        "name": "کوثر 2",
        "projectUrl": "#",
        "imageUrl": "./images/slide20.png"
      }
    ],
    "row3": [
      {
        "name": "مجموعه فرهنگی حسین آباد",
        "projectUrl": "#",
        "imageUrl": "./images/Slide1.jpg"
      },
      {
        "name": "مرکز رشد و فناوری دانشگاه صنعتی",
        "projectUrl": "#",
        "imageUrl": "./images/projects/grTech/GrTech_1.jpg"
      },
      {
        "name": "استخر دانشگاه علوم پزشکی",
        "projectUrl": "#",
        "imageUrl": "./images/Slide12.jpg"
      },
      {
        "name": "زمین ورزشی غرب",
        "projectUrl": "#",
        "imageUrl": "./images/projects/sportsField/4.jpg"
      },
      {
        "name": "مجموعه فرهنگی حسین آباد",
        "projectUrl": "#",
        "imageUrl": "./images/Slide1.jpg"
      },
      {
        "name": "کوثر 2",
        "projectUrl": "#",
        "imageUrl": "./images/slide20.png"
      }
    ]
  },
  "stats": {
    "title": "پروژه ها",
    "stats": [
      {
        "name": "راه و ترابری",
        "number": 5,
        "url": "#"
      },
      {
        "name": "تاسیسات و تجهیزات",
        "number": 5,
        "url": "#"
      },
      {
        "name": "ساختمان و ابنیه",
        "number": 2,
        "url": "#"
      }
    ],
  },
  "services": [
    {
      "id": 1,
      "title": "طراحی و اجرا",
      "videoUrl": "/videos/design.mp4",
      "initialGrow": 1,
      "finalGrow": 1
    },
    {
      "id": 2,
      "title": "مشارکت در ساخت",
      "videoUrl": "/videos/construction.mp4",
      "initialGrow": 1,
      "finalGrow": 2
    },
    {
      "id": 3,
      "title": "پروژه های پیش فروش",
      "videoUrl": "/videos/presale.mp4",
      "initialGrow": 1,
      "finalGrow": 2
    },
    {
      "id": 4,
      "title": "پروژه های فعال",
      "videoUrl": "/videos/active.mp4",
      "initialGrow": 1,
      "finalGrow": 1
    }
  ],
  "lodge": {
    "title": "گروه ساختمانی لژ",
    "description": "مشارکت در ساخت، ساخت و اجرا، سرمایه گذاری و ...  \n بیش از ۲۰ سال سابقه \n از طراحی تا اجرا",
    "lodge_logo": "images/Lodge.png"
  },
  "lodge_projects": [
    {
      "name": "پروژه سرو",
      "image": "images/lodge_sarv_project4.png"
    },
    {
      "name": "پروژه لژ 1",
      "image": "images/lodge_1_project.png"
    }
  ],
  "licenses": {
    "title": "گواهینامه ها",
    "pictures": [
      {
        "id": "1",
        "title": "ISO 9003:2018",
        "logo": "iao-9001.png"
      },
      {
        "id": "2",
        "title": "ISO 9003:2018",
        "logo": "iso-9003.png"
      },
      {
        "id": "3",
        "title": "ISO 9003:2018",
        "logo": "iso-14001.png"
      },
      {
        "id": "4",
        "title": "ISO 9003:2018",
        "logo": "iso-22000.png"
      },
      {
        "id": "5",
        "title": "ISO 9003:2018",
        "logo": "iao-9001.png"
      },
      {
        "id": "6",
        "title": "ISO 9003:2018",
        "logo": "iso-9003.png"
      }
    ]
  },
  "footer": {
    "title": "شرکت پرتو جی شید (سهامی خاص)",
    "contact": {
      "title": "تماس با ما",
      "address": "خیابان چهارباغ بالا شریعتی شرقی رو به روی بانک آینده ساختمان الماس طبقه ۳ واحد ۱۲",
      "cellphone": "09013682870",
      "phone": "03136286668",
      "email": "pjs.civil@gmail.com",
      "instagram": "https://instagram.com",
      "whatsapp": "images/whatsapp.jpg",
      "telegram": "https://t.me/Pjs_co"
    }
  }
};

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
        <Navbar input={main_page_json.navbar} />
        <DemoOne title={main_page_json.title} />
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
          <HeroSectionDemo input={main_page_json.about} />
          <Slider input={main_page_json.projects} />
          <div className="bg-[linear-gradient(35deg,rgb(230,230,230)_35%,rgb(250,250,250)_72%,rgb(255,255,255)_100%)]">
            <div className="bg-transparent w-full flex justify-center items-center -translate-y-12">
              <ProjectStats input={main_page_json.stats} />
            </div>
            <Services input={main_page_json.services} />
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
