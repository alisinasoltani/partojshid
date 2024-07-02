"use client"
import Image from "next/image";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import JeyshidEjlasProject from "@/public/images/projects/Ejlas_lg.png";
import jeyshidFieldProject from "@/public/images/projects/jeyshidFieldProject.jpg";
import jeyshidkousarProject from "@/public/images/projects/jeyshidkousarProject.jpg";
import jeyshidPoolProject from "@/public/images/projects/jeyshidPoolProject.jpg";
import jeyshidFarhangProject from "@/public/images/projects/jeyshidFarhangProject.png";
import jeyshidBaharestanProject from "@/public/images/projects/jeyshidBaharestanProject.png";
import JeyshidConcStrucProject from "@/public/images/projects/JeyshidConcStrucProject.jpg";
// import JeyshidCultureProject from "@/public/images/projects/JeyshidCultureProject.jpg";
import JeyshidEngSysProject from "@/public/images/projects/JeyshidEngSysProject.jpg";
import JeyshidGrTechCentProject from "@/public/images/projects/JeyshidGrTechCentProject.jpg";
// import JeyshidGuardStructProject from "@/public/images/projects/JeyshidGuardStructProject.jpg";
// import JeyshidGymProject from "@/public/images/projects/JeyshidGymProject.jpg";
import JeyshidMatPrepProject from "@/public/images/projects/JeyshidMatPrepProject.jpg";
import JeyshidSadraProject from "@/public/images/projects/JeyshidSadraProject.jpg";
import JeyshidShedProject from "@/public/images/projects/JeyshidShedProject.jpg";
import JeyshidStationProject from "@/public/images/projects/JeyshidStationProject.jpg";
import JeyshidStorageProject from "@/public/images/projects/JeyshidStorageProject.jpg";

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
        {/*  Ejlas */}
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
        {/* West Sports Field */}
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
        {/* Kousar */}
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
        {/* Culture Project */}
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
        {/* Pool */}
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
        {/* Poolad */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            {/* <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidPoolProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" /> */}
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.poolad.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.poolad.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.poolad.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Goltaash */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidMatPrepProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.goltaash.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.goltaash.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.goltaash.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Engineer System */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidEngSysProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.engSys.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.engSys.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.engSys.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Bahaarestan */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidBaharestanProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.bahaarestan.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.bahaarestan.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              وضعیت: { projectsList.bahaarestan.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Sarooj Concrete Prepration */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidConcStrucProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.saarooj.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.saarooj.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.saarooj.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Sadra */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidSadraProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.sadraSchool.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.sadraSchool.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.sadraSchool.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Growth and Tech Center */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidGrTechCentProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.growthAndTech.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.growthAndTech.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.growthAndTech.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Storage */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidStorageProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.storage.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.storage.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.storage.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* CNG Station */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidStationProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.cng.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.cng.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.cng.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
        {/* Tanker */}
        <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
          <div className="flex flex-col lg:basis-4/12 basis-12/12">
            <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={JeyshidShedProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Pool Project" />
          </div>
          <div className="flex flex-col lg:basis-8/12 basis-12/12 md:gap-8 gap-6 text-right text-black items-end justify-center px-8 py-8">
            <h2 className="font-bold lg:text-2xl text-lg">پروژه { projectsList.tanker.name }</h2>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ شروع: { projectsList.tanker.start }
            </h3>
            <h3 className="font-bold lg:text-xl text-lg">
              تاریخ پایان: { projectsList.tanker.end }
            </h3>
            {/* <h3 className="font-bold lg:text-xl text-lg">
              کارفرما : { projectsList.pool.employer }
            </h3> */}
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Projects;