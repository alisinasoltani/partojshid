'use client'
import aboutLodge1 from '@/public/images/lodge/aboutLodge1.jpg';
import aboutLodge2 from '@/public/images/lodge/aboutLodge2.jpg';
import Image from 'next/image';
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LodgeAbout = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(".about-title", {
            scrollTrigger: {
                trigger: "#about",
                scrub: true,
                start: 'top-=1200px top',
                end: 'bottom bottom',
            },
            '--titleAfter': '4rem',
            marginRight: '0rem',
        });
    }, []);
    return (
        <div className='flex flex-col items-end overflow-hidden' id='about'>
            <h2 className="about-title flex yekanb text-[45px] h-fit w-fit font-bold my-6 text-black">درباره ما</h2>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row justify-end'>
                    <Image src={aboutLodge1} alt='Lodge About Picture' width={600} />
                </div>
                <div className='flex flex-row justify-center items-center w-full text-center my-[3rem]'>
                    <p className='text-black max-w-[52rem] yekanb lg:text-3xl md:text-2xl text-xl px-12' style={{lineHeight: '3rem', direction: 'rtl'}}>
                    گروه ساختمانی لژ با تکیه بر تجربه ی بیش از ۲۰سال طراحی، اجرا و نظارت انواع پروژه های ساختمانی در شرکت پرتو جی شید و با هدف استفاده هرچه بیشتر از پتانسیل موجود، آماده ی خدمت رسانی به هم میهنان عزیز و هر نوع همکاری در قالب مشارکت در ساخت، ساخت و اجرا، سرمایه گذاری و... در کلیه مراحل از طراحی تا اجرای انواع پروژه های ساختمانی شخصی می باشد.
                    </p>
                </div>
                <div className='flex flex-row'>
                    <Image src={aboutLodge2} alt='Lodge About Picture' width={600} />
                </div>
            </div>
        </div>
    )
}

export default LodgeAbout