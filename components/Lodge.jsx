'use client'
import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import LojLogo from "@/public/images/Lodge2.png";
import Link from "next/link";

export default function Lodge() {
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
        id="lodge">
            <Link href={'/lodge'}><Image src={LojLogo} width={290} alt="Lodge Logo" /></Link>
            <Link href={'/lodge'}>
                <h2 className="lg:text-[58px] md:text-[40px] text-[40px] text-right yekanb">گروه ساختمانی لژ</h2>
            </Link>
        </div>
    );
}