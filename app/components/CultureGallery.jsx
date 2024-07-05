import { Swiper, SwiperSlide } from 'swiper/react';
import culture1 from '@/public/images/projects/culture/culture_1.jpg';
import culture2 from '@/public/images/projects/culture/culture_2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function CultureGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={culture1} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={culture2} fill alt='Culture Center Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
