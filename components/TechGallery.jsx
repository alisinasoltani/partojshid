import { Swiper, SwiperSlide } from 'swiper/react';
import grTech1 from '@/public/images/projects/grTech/GrTech_1.jpg';
import grTech2 from '@/public/images/projects/grTech/GrTech_2.jpg';
import grTech3 from '@/public/images/projects/grTech/GrTech_3.jpg';
import grTech4 from '@/public/images/projects/grTech/GrTech_4.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function TechGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={grTech1} fill alt='Growth and Tech Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={grTech2} fill alt='Growth and Tech Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={grTech3} fill alt='Growth and Tech Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={grTech4} fill alt='Growth and Tech Center Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
