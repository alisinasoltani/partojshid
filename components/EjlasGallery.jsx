import { Swiper, SwiperSlide } from 'swiper/react';
import ejlas1 from '@/public/images/projects/ejlas/ejlas1.jpg';
import ejlas2 from '@/public/images/projects/ejlas/ejlas2.jpg';
import ejlas3 from '@/public/images/projects/ejlas/ejlas3.jpg';
import ejlas4 from '@/public/images/projects/ejlas/ejlas4.jpg';
import ejlas5 from '@/public/images/projects/ejlas/ejlas5.jpg';
import ejlas6 from '@/public/images/projects/ejlas/ejlas6.jpg';
import ejlas7 from '@/public/images/projects/ejlas/ejlas7.jpg';
import ejlas8 from '@/public/images/projects/ejlas/ejlas8.jpg';
import ejlas9 from '@/public/images/projects/ejlas/ejlas9.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function EjlasGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={ejlas6} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas7} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas8} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas9} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas5} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas1} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas2} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas3} fill alt='Ejlas Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={ejlas4} fill alt='Ejlas Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
