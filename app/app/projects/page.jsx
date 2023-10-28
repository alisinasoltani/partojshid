"use client"
import Image from "next/image";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import JeyshidEjlasProject from "@/public/images/projects/JeyshidEjlasProject.jpg";
import jeyshidFieldProject from "@/public/images/projects/jeyshidFieldProject.jpg";
import jeyshidkousarProject from "@/public/images/projects/jeyshidkousarProject.jpg";
import jeyshidPoolProject from "@/public/images/projects/jeyshidPoolProject.jpg";

const Projects = () => {
  return (
    <>
      <Nav type={'solid'} />
      <div className="flex flex-col bg-white mt-[6rem] text-black">
        <div className="flex xl:flex-row flex-col items-center justify-center gap-x-[5rem] my-12">
          <div className="project flex flex-col xl:h-[30rem] mb-12 justify-start xl:items-end items-center">
            <div className="overflow-hidden mb-6 xl:w-[380px] w-[100vh] h-[285px]">
              <div className="projectImage">
                <Image src={JeyshidEjlasProject} alt="Parto Jeyshid Ejlas Project" />
              </div>
            </div>
            <h3 className="titr text-3xl text-right">پروژه اجلاس</h3>
          </div>
          <div className="project flex flex-col xl:h-[30rem] mb-12 justify-center xl:items-end items-center">
          <div className="overflow-hidden mb-6 xl:w-[380px] w-[100vh] h-[213px]">
              <div className="projectImage">
                <Image src={jeyshidFieldProject} alt="Parto Jeyshid Ejlas Project" />
              </div>
            </div>
            <h3 className="titr text-3xl text-right">پروژه زمین ورزشی</h3>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col items-center justify-center gap-x-[5rem] bg-[#f2f5f8]">
          <div className="project flex flex-col justify-start xl:items-end items-center my-12 xl:h-[30rem] xl:relative xl:top-[-100px]">
            <div className="overflow-hidden mb-6 xl:w-[380px] w-[100vh] h-[285px]">
              <div className="projectImage">
                <Image src={jeyshidkousarProject} alt="Parto Jeyshid Ejlas Project" />
              </div>
            </div>
            <h3 className="titr text-3xl text-right">پروژه کوثر</h3>
          </div>
          <div className="project flex flex-col justify-end xl:items-end items-center mb-12 xl:h-[30rem] xl:relative xl:top-[-100px]">
          <div className="overflow-hidden mb-6 xl:w-[380px] w-[100vh] h-[285px]">
              <div className="projectImage">
                <Image src={jeyshidPoolProject} alt="Parto Jeyshid Ejlas Project" />
              </div>
            </div>
            <h3 className="titr text-3xl text-right">پروژه استخر</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 place-content-center bg-white">
        <div className="projectXl grid row-span-1 xl:w-[53rem] w-[100vh] h-[25rem] place-content-center xl:relative xl:top-[-120px]">
          <h3 className="titr text-[50px]">پروژه ساختمانی</h3>
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Projects;