import { Swiper, SwiperSlide } from 'swiper/react';
import sadra1 from '@/public/images/projects/sadra/sadra_1.jpg';
import sadra2 from '@/public/images/projects/sadra/sadra_2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function SadraGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={sadra1} fill alt='Sadra Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sadra2} fill alt='Sadra Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
