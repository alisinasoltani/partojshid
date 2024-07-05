import { Swiper, SwiperSlide } from 'swiper/react';
import poolad1 from '@/public/images/projects/poolad/poolad_1.jpg';
import poolad2 from '@/public/images/projects/poolad/poolad_2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function PooladGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={poolad1} fill alt='Poolad Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={poolad2} fill alt='Poolad Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
