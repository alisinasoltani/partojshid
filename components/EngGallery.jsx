import { Swiper, SwiperSlide } from 'swiper/react';
import engSys1 from '@/public/images/projects/engSys/engSys_1.jpg';
import engSys2 from '@/public/images/projects/engSys/engSys_2.jpg';
import engSys3 from '@/public/images/projects/engSys/engSys_3.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function EngGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={engSys1} fill alt='Engineer System Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={engSys2} fill alt='Engineer System Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={engSys3} fill alt='Engineer System Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
