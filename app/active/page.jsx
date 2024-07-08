'use client'
import '@/app/contribute/styles.css';
import Nav from "@/components/Nav";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import Image from "next/image";
import jeyshidBaharestanProject from '@/public/images/projects/jeyshidBaharestanProject.png';
import BaharestanGallery from '@/components/BaharestanGallery';

const Contribute = () => {
    const [lenis, setLenis] = useState();
    useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    setLenis(lenis);
    }, []);
    return (
        <div className="w-full flex flex-col">
            <Nav lenis={lenis} type={'solid'} />
            <div className="w-full flex flex-col mt-[8.5rem] px-[3rem]">
                <div className="w-full about-page-title text-black text-right mb-12 flex flex-row justify-end items-start">
                    <h1 className="text-3xl font-bold">پروژه های فعال</h1>
                </div>
                <div className="w-full flex lg:flex-row flex-col lg:items-start justify-center rounded-2xl overflow-hidden bg-[#f4f4f4]">
                    <div className="flex flex-col lg:basis-4/12 basis-12/12">
                        <Image className="lg:min-h-[19rem] lg:min-w-[19rem]" src={jeyshidBaharestanProject} layout={"responsive"} width={300} height={300} sizes="(max-width: 400px) 60vw, (max-width: 960px) 80vw, 95vw" alt="Parto Jeyshid Ejlas Saran Project"
                        onClick={()=>document.getElementById('lodge1ProjectModal').showModal()} />
                        <dialog id="lodge1ProjectModal" className="modal modal-middle">
                            <div className="modal-box w-11/12 max-w-[80vw] max-h-[100vh]">
                                <h3 className="font-bold text-lg text-center pb-5">پروژه بهارستان</h3>
                                <BaharestanGallery />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                    <div className="flex flex-col lg:basis-8/12 basis-12/12 text-black items-end justify-center px-8 py-8">
                        <h2 className="font-bold lg:text-2xl text-lg">پروژه بهارستان</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contribute;