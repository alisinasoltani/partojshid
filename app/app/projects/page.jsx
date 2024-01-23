"use client"
import Image from "next/image";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import JeyshidEjlasProject from "@/public/images/projects/Slide8.jpg";
import jeyshidSportProject from "@/public/images/projects/JeyshidFieldProject.jpg";
import jeyshidkousarProject from "@/public/images/projects/jeyshidkousarProject.jpg";
import jeyshidPoolProject from "@/public/images/projects/jeyshidPoolProject.jpg";
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
      <div className="flex flex-row justify-center items-center w-[100%] mt-[7rem]">
        <div className="flex flex-row justify-center items-center projectCover w-[60rem] max-w-[60vw] h-[25rem]">
          <h3 className="yekanb text-[50px]">پروژه های پرتو جی شید</h3>
        </div>
      </div>
      <div className="flex flex-col bg-white text-black">
        <div className="flex lg:flex-row flex-col items-center justify-center gap-x-[5rem] mt-12 mb-2">
          <div className="project flex flex-col lg:h-[30rem] mb-12 justify-start lg:items-end items-center">
            <div className="overflow-hidden mb-6 lg:w-[380px] w-[100vh] h-[200px]">
              <div className="projectImage w-[411] aspect-square">
                <Image src={JeyshidEjlasProject} alt="Parto Jeyshid Ejlas Project" width={411} />
              </div>
            </div>
            <h3 className="yekanb text-3xl text-right">پروژه اجلاس</h3>
          </div>
          <div className="project flex flex-col lg:h-[30rem] mb-12 justify-center lg:items-end items-center">
          <div className="overflow-hidden mb-6 lg:w-[411px] w-[100vh] h-[213px]">
              <div className="projectImage w-[411] aspect-square">
                <Image src={jeyshidSportProject} alt="Parto Jeyshid Ejlas Project" width={411} />
              </div>
            </div>
            <h3 className="yekanb text-3xl text-right">پروژه زمین ورزشی</h3>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-center gap-x-[5rem] bg-[#f2f5f8]">
          <div className="project flex flex-col justify-start lg:items-end items-center mt-2 mb-12 lg:h-[30rem] lg:relative lg:top-[-100px]">
            <div className="overflow-hidden mb-6 lg:w-[411px] w-[100vh] h-[285px]">
              <div className="projectImage w-[411] aspect-square">
                <Image src={jeyshidkousarProject} alt="Parto Jeyshid Ejlas Project" width={411} />
              </div>
            </div>
            <h3 className="yekanb text-3xl text-right">2 پروژه کوثر</h3>
          </div>
          <div className="project flex flex-col justify-end lg:items-end items-center mb-12 lg:h-[30rem] lg:relative lg:top-[-100px]">
          <div className="overflow-hidden mb-6 lg:w-[411px] w-[100vh] h-[285px]">
              <div className="projectImage w-[411] aspect-square">
                <Image src={jeyshidPoolProject} alt="Parto Jeyshid Ejlas Project" width={411} />
              </div>
            </div>
            <h3 className="yekanb text-3xl text-right">پروژه استخر 9 دی</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-white justify-center items-center">
        <div className="projectXl lg:w-[60rem] flex flex-row justify-center items-center max-w-[80vw] lg:h-[25rem] lg:relative lg:top-[-120px]">
          <h3 className="yekanb text-[50px]">پروژه حسین آباد</h3>
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Projects;