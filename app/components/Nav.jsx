"use client"
import Image from "next/image";
import partoLogo from "@/public/partoLogo.png";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Nav({ type }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (type == 'transparent') {
            gsap.set(".navbar", {
            backgroundColor: 'rgba(255,255,255,0)',
            });
            gsap.to(".navbar", {
                scrollTrigger: {
                    scrub: 0.8,
                    start: "top+=200px",
                    end: "+=1",
                },
                backgroundColor: "rgba(255,255,255,1)",
                color: "#000000",
                boxShadow: "0px 1px 15px 1px rgb(144, 144, 144)",
            });
        } else if (type == 'solid') {
            gsap.set(".navbar", {
                backgroundColor: "rgba(255,255,255,1)",
                color: "#000000",
                boxShadow: "0px 1px 15px 1px rgb(144, 144, 144)",
            });
        }
    }, []);
    return (
        <div className="navbar xl:flex flex-row justify-between px-[7rem] py-4 hidden" style={{direction: "rtl"}}>
            <div className="flex-1">
                <a className="normal-case text-xl">
                    <Image src={partoLogo} width={55} />
                </a>
            </div>
            <div className="flex flex-row gap-[3.5rem] yekanb text-lg">
                <h3>درباره ما</h3>
                <h3>خدمات</h3>
                <Link href={"/projects"}><h3>پروژه ها</h3></Link>
                <h3>گروه ساختمانی لژ</h3>
                <h3>تماس با ما</h3>
            </div>
        </div>
    );
}