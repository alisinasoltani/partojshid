import '@/app/lodge/styles.css';
import Image from 'next/image';
import buildDefinition from '@/public/logos/build-definition.svg';
import building from '@/public/logos/building.svg';
import sarvProject from '@/public/images/lodge/sarvProject.png';
import lodge1Project from '@/public/images/lodge/lodge1Project.png';
import SwiperGallery from './SwiperGallery';

const LodgeProjects = () => {
  return (
    <div className='flex flex-col justify-start items-center my-[3rem]'>
        <div className="flex flex-row py-3 px-8">
            <div className='flex flex-col'><Image src={buildDefinition} alt='seal check logo' width={40} /></div>
            <h2 className="lodge-title yekanb">پروژه ها</h2>
            <div className='flex flex-col'><Image src={building} alt='license logo' width={40} /></div>
        </div>
        <div className='flex md:flex-row flex-col pt-8 gap-12'>
          <div className='flex flex-col bg-[#F4F4F4] rounded-2xl overflow-hidden'>
            <h2 className='text-2xl yekanb text-black text-right p-4'>پروژه لژ 1</h2>
            <Image src={lodge1Project} alt='Lodge Sarv Project' width={350} />
            <p className='text-lg yekanb text-black max-w-[350px] px-4 py-6 text-right' style={{direction: 'rtl'}}>
            پروژه مجتمع مسکونی لژ ۱ واقع در چشمه توتی اصفهان. <br />
            فرصت سرمایه گذاری و پیش خرید واحد های مسکونی.
            </p>
          </div>
          <div className='flex flex-col bg-[#F4F4F4] rounded-2xl overflow-hidden'>
            <h2 className='text-2xl yekanb text-black text-right p-4'>پروژه سرو</h2>
            <Image src={sarvProject} alt='Lodge Sarv Project' width={350} />
            <p className='text-lg yekanb text-black max-w-[350px] px-4 py-6 text-right' style={{direction: 'rtl'}}>
            پروژه ساختمان مسکونی سرو واقع در خیابان آزادی اصفهان به سفارش کارفرمای شخصی، پروژه لوکس با معماری مدرن و سیستم های فوق هوشمند.
            </p>
            <button className="btn rounded-none bg-slate-900" onClick={()=>document.getElementById('lodgeSarvProjectModal').showModal()}>اطلاعات بیشتر</button>
            <dialog id="lodgeSarvProjectModal" className="modal w-full">
              <div className="modal-box h-[25rem]">
                <h3 className="font-bold text-lg text-center pb-5">پروژه سرو</h3>
                <SwiperGallery />
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
    </div>
  )
}

export default LodgeProjects