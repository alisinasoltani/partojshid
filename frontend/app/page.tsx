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
    "image": "/images/ejlas.avif"
  },
  "projects": {
    "row1": [
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/projects/ejlas/ejlas10.avif"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/Slide7.avif"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/projects/ejlas/ejlas11.avif"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/Slide6.avif"
      },
      {
        "name": "مرکز همایش های بین المللی اصفهان",
        "projectUrl": "projects/ejlas",
        "imageUrl": "./images/Slide16.avif"
      }
    ],
    "row2": [
      {
        "name": "مجموعه فرهنگی حسین آباد",
        "projectUrl": "#",
        "imageUrl": "./images/Slide1.avif"
      },
      {
        "name": "مرکز رشد و فناوری دانشگاه صنعتی",
        "projectUrl": "#",
        "imageUrl": "./images/projects/grTech/GrTech_1.avif"
      },
      {
        "name": "استخر دانشگاه علوم پزشکی",
        "projectUrl": "#",
        "imageUrl": "./images/Slide10.avif"
      },
      {
        "name": "مجموعه فرهنگی حسین آباد",
        "projectUrl": "#",
        "imageUrl": "./images/Slide1.avif"
      },
      {
        "name": "زمین ورزشی غرب",
        "projectUrl": "#",
        "imageUrl": "./images/projects/sportsField/7.avif"
      },
      {
        "name": "کوثر 2",
        "projectUrl": "#",
        "imageUrl": "./images/slide20.avif"
      },
    ]
  },
  "stats": {
    "title": "رتبه ها",
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
    "lodge_logo": "images/Lodge.avif"
  },
  "lodge_projects": [
    {
      "name": "پروژه سرو",
      "image": "/images/lodge_sarv_project4.avif"
    },
    {
      "name": "پروژه لژ 1",
      "image": "/images/lodge_1_project.avif"
    }
  ],
  "licenses": {
    "title": "گواهینامه ها",
    "certificates": [
      {
        "id": "1",
        "title": "ISO 9003:2018",
        "logo": "iso9001.jpg"
      },
      {
        "id": "2",
        "title": "ISO 9003:2018",
        "logo": "iso9003.jpg"
      },
      {
        "id": "3",
        "title": "ISO 9003:2018",
        "logo": "iso14001.jpg"
      },
      {
        "id": "4",
        "title": "ISO 9003:2018",
        "logo": "iso22000.jpg"
      },
      {
        "id": "5",
        "title": "ISO 9003:2018",
        "logo": "iso9001.jpg"
      },
      {
        "id": "6",
        "title": "ISO 9003:2018",
        "logo": "iso9003.jpg"
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
      "instagram": "https://www.instagram.com/pjs.civil",
      "whatsapp": "/images/whatsapp.avif",
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
    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 4000);
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
      gsap.to(loadingScreenRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    }
  }, [isLoading]);

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
          <div className="bg-[linear-gradient(35deg,rgb(229 231 235)_35%,rgb(230,230,230)_72%,rgb(255,255,255)_100%)]">
            <div className="bg-transparent w-full flex justify-center items-center -translate-y-12">
              <ProjectStats input={main_page_json.stats} />
            </div>
            <Services input={main_page_json.services} />
          </div>
          <div className="bg-[linear-gradient(135deg,rgb(229 231 235)_32%,rgb(255,255,255)_100%)]">
            <Lodge input={main_page_json.lodge} />
            <MainLodgeProjects />
          </div>
          <div className="bg-[linear-gradient(95deg,rgb(229 231 235)_-10%,rgb(250,250,250)_100%)]">
            <News />
            <Licenses input={main_page_json.licenses} />
          </div>
        </div>
        <Footer input={main_page_json.footer} />
      </div>
    </>
  );
}
