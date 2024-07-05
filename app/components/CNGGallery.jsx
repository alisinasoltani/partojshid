import { Swiper, SwiperSlide } from 'swiper/react';
import station1 from '@/public/images/projects/station/station_1.jpg';
import station2 from '@/public/images/projects/station/station_2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function CNGGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={station1} fill alt='CMG Station Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={station2} fill alt='CMG Station Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
