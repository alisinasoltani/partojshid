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
import projectsList from "@/projects";
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
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.ejlas.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.ejlas.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.ejlas.end }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.ejlas.employer }
            </h3>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidFieldProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Sports Field Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.WestSportsField.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.WestSportsField.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.WestSportsField.end }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.WestSportsField.employer }
            </h3>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidkousarProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Kousar 2 Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.kousar.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.kousar.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.kousar.end }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.kousar.employer }
            </h3>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidFarhangProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Cultural Center Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.cultAss.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.cultAss.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.cultAss.end }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.cultAss.employer }
            </h3>
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidPoolProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.pool.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.pool.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.pool.end }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3>
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Projects;