'use client'
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import LojLogo from "@/public/images/Lodge2.png";

export default function Loj() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to('.loj h2', {
            scrollTrigger: {
                trigger: '.loj',
                start: 'top-=100px center',
                end: 'bottom center+=100px',
                scrub: true,
            },
            x: 0,
        })
        gsap.to('.loj img', {
            scrollTrigger: {
                trigger: '.loj',
                start: 'top-=100px center',
                end: 'bottom center+=100px',
                scrub: true,
            },
            opacity: 1,
        })
    }, []);
    return (
        <div className="loj flex md:flex-row flex-col lg:justify-between justify-center gap-[6rem] items-center md:h-[35rem] h-[90vh] px-[6rem]"
        id="loj">
            <Image src={LojLogo} width={300} alt="Loj Logo" />
            <h2 className="lg:text-[68px] md:text-[40px] text-[40px] text-right yekanb">گروه ساختمانی لژ</h2>
        </div>
    );
}