"use client"
import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/all";
import partoLogo from "@/public/partoLogo.png";

export default function Nav() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(".navbar", {
            scrollTrigger: {
                scrub: 0.5,
                start: "top+=200px",
                end: "+=1",
            },
            backgroundColor: "rgba(255,255,255,1)",
            color: "#000000",
            boxShadow: "0px 1px 15px 1px rgb(144, 144, 144)",
        });
    }, []);
    return (
        <div className="navbar flex flex-row justify-between bg-[rgba(255,255,255,0)] px-[7rem] py-4" style={{direction: "rtl"}}>
            <div className="flex-1">
                <a className="normal-case text-xl">
                    <Image src={partoLogo} width={55} />
                </a>
            </div>
            <div className="flex flex-row gap-[3.5rem] text-lg">
                <h3>درباره ما</h3>
                <h3>خدمات</h3>
                <h3>پروژه ها</h3>
                <h3>گروه ساختمانی لژ</h3>
                <h3>تماس با ما</h3>
            </div>
        </div>
    );
}