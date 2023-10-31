"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import slide1 from "@/public/images/iso9001.jpg";
import slide2 from "@/public/images/iso14001.jpg";
import slide3 from "@/public/images/iso22000.jpg";
import slide4 from "@/public/images/iso9003.jpg";
const Licenses = () => {
  return (
    <div className="bg-[white] flex flex-col justify-start items-center">
        <div className="bg-[rgba(12,14,70,1)] py-3 px-8 rounded-b-xl m-0 inline-flex yekanb text-3xl text-white font-semibold text-center">
            <h2>گواهینامه ها</h2>
        </div>
        <div className="bg-white w-full py-2">
            <Swiper slidesPerView={5} modules={[Navigation, Autoplay]}  navigation={true} spaceBetween={30} loop={true} autoplay={{delay: 3000, disableOnInteraction: true}}>
                <SwiperSlide className='pt-4'>
                    <Image src={slide1} width={250} alt="HSE License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide2} width={250} alt="ISO 9001 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide3} width={250} alt="ISO 9003 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide4}  width={250} alt="ISO 14001 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide1} width={250} alt="HSE License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide2} width={250} alt="ISO 9001 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide3} width={250} alt="ISO 9003 License" />
                </SwiperSlide>
                <SwiperSlide className='pt-4'>
                    <Image src={slide4}  width={250} alt="ISO 14001 License" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
  );
}

export default Licenses;