import { Swiper, SwiperSlide } from 'swiper/react';
import storage1 from '@/public/images/projects/storage/storage_1.jpg';
import storage2 from '@/public/images/projects/storage/storage_2.jpg';
import storage3 from '@/public/images/projects/storage/storage_3.jpg';
import storage4 from '@/public/images/projects/storage/storage_4.jpg';
import storage5 from '@/public/images/projects/storage/storage_5.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function GoltaashGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={storage1} fill alt='Storage Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={storage2} fill alt='Storage Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={storage3} fill alt='Storage Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={storage4} fill alt='Storage Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={storage5} fill alt='Storage Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}