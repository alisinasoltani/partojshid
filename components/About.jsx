'use client'
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ejals from "@/public/images/ejlas_about.jpg";
import ejals2 from "@/public/images/ejlas2_about.jpg";
// import field from "@/public/images/field_about.png";

export default function About() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to("#fromBottom", {
            scrollTrigger: {
                trigger: "#about",
                scrub: true,
                start: 'top-=500px top',
                end: 'bottom bottom',
            },
            y: 0,
        });
        gsap.to("#fromTop", {
            scrollTrigger: {
                trigger: "#about",
                scrub: true,
                start: 'top-=500px top',
                end: 'bottom bottom',
            },
            y: 0,
        });
        gsap.to(".about-title", {
            scrollTrigger: {
                trigger: "#about",
                scrub: true,
                start: 'top-=500px top',
                end: 'bottom bottom',
            },
            '--titleAfter': '4rem',
            marginRight: '0rem',
        });
    }, [])
    return (
        <div id="about" className="grid grid-rows-1 grid-cols-12 bg-white text-black lg:m-0 mb-[6rem]">
            <div className="lg:grid grid-rows-1 grid-cols-2 hidden row-span-1 md:col-span-7 gap-10">
                <div id="fromBottom" className="grid justify-end pt-[8rem]">
                    <Image src={ejals2} height={600} alt="Ejlas Project by Parto Jeyshid" />
                </div>
                <div id="fromTop" className="grid pb-[8rem]">
                    <Image src={ejals} height={600} alt="Ejlas Project by Parto Jeyshid" />
                </div>
            </div>
            <div className="flex flex-col justify-start items-end gap-5 row-span-1 lg:col-span-5 col-span-12 text-right">
                <h2 className="about-title flex yekanb text-[45px] h-fit w-fit font-bold mt-[6rem]">درباره ما</h2>
                <span className="flex yekan lg:text-[21px] md:text-[21px] text-[20px] md:mr-[3rem] mx-[2rem]" style={{direction: 'rtl'}}>
                شرکت مهندسی پرتو جی شید با بیش  از  20  سال  سابقه و با نیت خدمت و کمک به عمران و آبادانی کشور
                و با بکارگیری پرسنل مجرب و توانمند در زمینه   پروژه های عمرانی  با موضوع  ابنیه ، تاسیسات ،
                راه  و ترابری و آب و فاضلاب مشغول به فعالیت می باشد و در راستای اجرای سیستم مدیریت یکپارچه (IMS) و همچنین سیستم مدیریت کیفیت پروژه ISO 10006   
                اهداف خود را به ثمر  می رساند .
                </span>
            </div>
        </div>
    )
}