import { Swiper, SwiperSlide } from 'swiper/react';
import matPrep1 from '@/public/images/projects/matPrep/matPrep_1.jpg';
import matPrep2 from '@/public/images/projects/matPrep/matPrep_2.jpg';
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

export default function MatPrepGallery() {
  return (
    <>
      <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper h-[32rem] w-[32rem]">
        <SwiperSlide><Image src={matPrep1} fill alt='Material Prepration Project Picture' /></SwiperSlide>
        <SwiperSlide><Image src={matPrep2} fill alt='Material Prepration Project Picture' /></SwiperSlide>
      </Swiper>
    </>
  );
}
