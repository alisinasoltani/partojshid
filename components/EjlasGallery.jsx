import { Swiper, SwiperSlide } from 'swiper/react';
import ejlas1 from '@/public/images/projects/ejlas/ejlas1.jpg';
import ejlas2 from '@/public/images/projects/ejlas/ejlas2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function EjlasGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={ejlas1} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas2} fill alt='Ejlas Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
