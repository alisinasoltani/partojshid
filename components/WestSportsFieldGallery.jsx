import { Swiper, SwiperSlide } from 'swiper/react';
import sports1 from '@/public/images/projects/sportsField/1.jpg';
import sports2 from '@/public/images/projects/sportsField/2.jpg';
import sports3 from '@/public/images/projects/sportsField/3.jpg';
import sports4 from '@/public/images/projects/sportsField/4.jpg';
import sports5 from '@/public/images/projects/sportsField/5.jpg';
import sports6 from '@/public/images/projects/sportsField/6.jpg';
import sports7 from '@/public/images/projects/sportsField/7.jpg';
import sports8 from '@/public/images/projects/sportsField/8.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function WestSportsFieldGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={sports1} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports2} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports3} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports4} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports5} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports6} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports7} fill alt='Culture Center Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={sports8} fill alt='Culture Center Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
