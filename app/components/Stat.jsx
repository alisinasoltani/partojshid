'use client'
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Stat() {
    const {ref, inView, entry} = useInView({
        threshold: 0.5,
        triggerOnce: true,
    })
    return (
        <div className="stat text-black h-[230px] flex flex-row justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-[6rem] relative top-[5rem]">
                <div className="w-[15rem] aspect-square flex flex-col gap-4 justify-center items-center
                rounded-2xl bg-gray-200 text-[30px] font-bold text-center shadow-xl roya">
                    <h4>ساختمان و ابنیه</h4>
                    {inView ? <CountUp className="text-[60px]" end={3} duration={4} /> : 0}
                </div>
                <div ref={ref} className="w-[15rem] aspect-square flex flex-col gap-4 justify-center items-center
                rounded-2xl bg-gray-200 text-[30px] font-bold text-center shadow-xl roya">
                    <h4>تاسیسات و تجهیزات</h4>
                    {inView ? <CountUp className="text-[60px]" end={5} duration={4} /> : 0}
                    </div>
                    <div className="w-[15rem] aspect-square flex flex-col gap-4 justify-center items-center
                    rounded-2xl bg-gray-200 text-[30px] font-bold text-center shadow-xl roya">
                    <h4>راه و ترابری</h4>
                    {inView ? <CountUp className="text-[60px]" end={5} duration={4} /> : 0}
                </div>
            </div>
        </div>
    )
}