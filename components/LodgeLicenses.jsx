"use client"
import '@/app/lodge/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import slide1 from "@/public/images/iso9001.jpg";
import slide2 from "@/public/images/iso14001.jpg";
import slide3 from "@/public/images/iso22000.jpg";
import slide4 from "@/public/images/iso9003.jpg";
import check from "@/public/logos/check.svg";
import license from "@/public/logos/license.svg";
const LodgeLicenses = () => {
  return (
    <div className="flex flex-col justify-start items-center">
        <div className="flex flex-row py-3 px-8">
            <div className='flex flex-col'><Image src={check} alt='seal check logo' width={40} /></div>
            <h2 className='lodge-title yekanb'>گواهینامه ها</h2>
            <div className='flex flex-col'><Image src={license} alt='license logo' width={40} /></div>
        </div>
        <div className="bg-white w-full py-2">
            <Swiper modules={[Navigation, Autoplay]} navigation={true} loop={true} autoplay={{delay: 3000, disableOnInteraction: true}}
            breakpoints={{
                576: {
                    spaceBetween: 0,
                    slidesPerView: 1,
                },
                700: {
                    spaceBetween: 30,
                    slidesPerView: 2,
                },
                960: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                },
            }}>
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

export default LodgeLicenses;