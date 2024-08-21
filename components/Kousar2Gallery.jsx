import { Swiper, SwiperSlide } from 'swiper/react';
import kousar1 from '@/public/images/projects/kousar2/kousar_1.jpg';
import kousar3 from '@/public/images/projects/kousar2/kousar_2.jpg';
import kousar4 from '@/public/images/projects/kousar2/kousar_4.jpg';
import kousar5 from '@/public/images/projects/kousar2/kousar_5.jpg';
import kousar6 from '@/public/images/projects/kousar2/kousar_6.jpg';
import kousar7 from '@/public/images/projects/kousar2/kousar_7.jpg';
import kousar8 from '@/public/images/projects/kousar2/kousar_8.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function Kousar2Gallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={kousar1} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={kousar3} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={kousar4} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={kousar5} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={kousar6} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={kousar7} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={kousar8} fill alt='Kousar 2 Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
