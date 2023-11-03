"use client"
import Image from "next/image";
import Nav from "@/components/Nav";
import Pagination from "@/components/Pagination";
import JeyshidEjlasProject from "@/public/images/projects/JeyshidEjlasProject.jpg";
import jeyshidSportProject from "@/public/images/projects/JeyshidFieldProject.jpg";
import jeyshidkousarProject from "@/public/images/projects/jeyshidkousarProject.jpg";
import jeyshidPoolProject from "@/public/images/projects/jeyshidPoolProject.jpg";

const Projects = () => {
  return (
    <>
      <Nav type={'solid'} />
      <div className="flex flex-col bg-white mt-[6rem] text-black">
        <div className="flex lg:flex-row flex-col items-center justify-center gap-x-[5rem] my-12">
          <div className="project flex flex-col lg:h-[30rem] mb-12 justify-start lg:items-end items-center">
            <div className="overflow-hidden mb-6 lg:w-[411px] w-[100vh] h-[285px]">
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
          <div className="project flex flex-col justify-start lg:items-end items-center my-12 lg:h-[30rem] lg:relative lg:top-[-100px]">
            <div className="overflow-hidden mb-6 lg:w-[411px] w-[100vh] h-[285px]">
              <div className="projectImage w-[411] aspect-square">
                <Image src={jeyshidkousarProject} alt="Parto Jeyshid Ejlas Project" width={411} />
              </div>
            </div>
            <h3 className="yekanb text-3xl text-right">پروژه کوثر</h3>
          </div>
          <div className="project flex flex-col justify-end lg:items-end items-center mb-12 lg:h-[30rem] lg:relative lg:top-[-100px]">
          <div className="overflow-hidden mb-6 lg:w-[411px] w-[100vh] h-[285px]">
              <div className="projectImage w-[411] aspect-square">
                <Image src={jeyshidPoolProject} alt="Parto Jeyshid Ejlas Project" width={411} />
              </div>
            </div>
            <h3 className="yekanb text-3xl text-right">پروژه استخر</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-1 place-content-center bg-white w-[80vh]">
        <div className="projectlg grid row-span-1 lg:w-[53rem] h-[25rem] place-content-center lg:relative lg:top-[-120px]">
          <h3 className="yekanb text-[50px]">پروژه ساختمانی</h3>
        </div>
      </div>
      <Pagination />
    </>
  );
}

export default Projects;