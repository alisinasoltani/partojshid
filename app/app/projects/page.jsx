"use client"
import Image from "next/image";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import JeyshidEjlasProject from "@/public/images/projects/Ejlas_lg.png";
import jeyshidFieldProject from "@/public/images/projects/jeyshidFieldProject.jpg";
import jeyshidkousarProject from "@/public/images/projects/jeyshidkousarProject.jpg";
import jeyshidPoolProject from "@/public/images/projects/jeyshidPoolProject.jpg";
import jeyshidFarhangProject from "@/public/images/projects/jeyshidFarhangProject.png";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";

const Projects = () => {
  const [lenis, setLenis] = useState();
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    setLenis(lenis);
  }, []);
  return (
    <>
      <Nav type={'solid'} lenis={lenis} />
      <div className="flex flex-col mt-[9rem] mb-[3rem] lg:mx-[5rem] mx-[2rem] gap-[3rem] items-center justify-center">
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidEjlasProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Ejlas Saran Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه اجلاس سران</h2>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidFieldProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Sports Field Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه ورزشگاه غرب</h2>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidkousarProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Kousar 2 Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه کوثر 2</h2>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidFarhangProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Cultural Center Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه فرهنگسرای حسین آباد</h2>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidPoolProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه استخر 9 دی</h2>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Projects;