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
        <div className="loj flex flex-row justify-between items-end h-[35rem] px-[6rem]">
            <Image className="pb-[6rem]" src={LojLogo} width={320} alt="Loj Logo" />
            <h2 className="text-[68px] pb-[12rem] titr">گروه ساختمانی لژ</h2>
        </div>
    );
}