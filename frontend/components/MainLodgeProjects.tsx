import Image from "next/image";
import lodge_sarv_project from "@/public/images/lodge_sarv_project4.png";
import lodge_1_project from "@/public/images/lodge_1_project.png";
import lodge_arrows_right from "@/public/icons/lodge_project_arrows_right.svg"; 
import lodge_arrows_left from "@/public/icons/lodge_project_arrows_left.svg"; 

const MainLodgeProjects = () => {
  return (
    <div className='mt-12 flex flex-col justify-center items-center px-20 md:px-0 gap-20 md:gap-32 bg-transparent'>
        <div className="relative flex flex-col justify-center items-center md:flex-row gap-3">
            <div className="z-10">
                <Image src={lodge_sarv_project} className="max-w-[350px]" alt="lodge sarv project 3d image" />
            </div>
            <div className="absolute right-[33%] top-[40%] z-0 hidden md:flex">
                <Image src={lodge_arrows_right} width={100} alt="" />
            </div>
            <div className="h-full irsans_med text-4xl text-center flex justify-center items-center md:-translate-y-8 md:translate-x-0">
                <h3>پروژه سرو</h3>
            </div>
        </div>
        <div className="relative flex flex-col justify-center items-center md:flex-row-reverse gap-3">
            <div className="z-10">
                <Image src={lodge_1_project} className="max-w-[350px]" alt="lodge 1 project 3d image" />
            </div>
            <div className="absolute left-[20%] top-[40%] z-0 hidden md:flex">
                <Image src={lodge_arrows_left} width={100} alt="" />
            </div>
            <div className="irsans_med text-4xl text-center md:-translate-y-5 md:-translate-x-12">
                <h3>پروژه لژ 1</h3>
            </div>
        </div>
    </div>
  )
}

export default MainLodgeProjects