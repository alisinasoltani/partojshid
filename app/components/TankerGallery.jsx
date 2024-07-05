import { Swiper, SwiperSlide } from 'swiper/react';
import shed1 from '@/public/images/projects/shed/shed_1.jpg';
import shed2 from '@/public/images/projects/shed/shed_2.jpg';
import shed3 from '@/public/images/projects/shed/shed_3.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function TankerGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={shed1} fill alt='Shed Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={shed2} fill alt='Shed Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={shed3} fill alt='Shed Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
