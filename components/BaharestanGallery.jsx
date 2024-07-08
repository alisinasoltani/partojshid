import { Swiper, SwiperSlide } from 'swiper/react';
import baharestan01 from '@/public/images/projects/baharestan/baharestan01.png';
import baharestan02 from '@/public/images/projects/baharestan/baharestan02.png';
import baharestan03 from '@/public/images/projects/baharestan/baharestan03.png';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function BaharestanGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[70vw]">
        <SwiperSlide><Image src={baharestan01} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={baharestan02} fill alt='Sarv Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={baharestan03} fill alt='Sarv Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
