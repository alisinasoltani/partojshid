import Image from "next/image";
import lodge_projects_icon from "@/public/icons/lodge_projects_icon.svg";
import lodge_licenses_icon from "@/public/icons/lodge_licenses_icon.svg";
import lodge_connect_icon from "@/public/icons/lodge_connect_icon.svg";
import lodge_logo from "@/public/images/Lodge.png";
import Link from "next/link";

const Lodge = () => {
    return (
        <div className="md:w-[70vw] flex flex-col md:flex-row justify-center md:justify-center md:place-self-center items-center bg-transparent">
            <div className="z-10">
                <Image src={lodge_logo} width={250} alt="Lodge Logo" />
            </div>
            <div className="flex flex-col justify-center md:items-start md:place-self-end p-8" style={{ direction: 'rtl' }}>
                <div className="mb-4 md:mb-10 flex flex-row items-center md:text-right justify-center md:justify-start z-10">
                    <h2 className="irsans_med text-4xl text-center">گروه ساختمانی لژ</h2>
                </div>
                <div className="irsans_reg mb-1 text-center md:text-right z-10">
                    مشارکت در ساخت، ساخت و اجرا، سرمایه گذاری و ...
                </div>
                <div className="irsans_reg mb-1 text-center md:text-right z-10">
                    بیش از ۲۰ سال سابقه
                </div>
                <div className="irsans_reg mb-4 text-center md:text-right z-10">
                    از طراحی تا اجرا
                </div>
                <div className="flex gap-3 justify-center md:justify-start">
                    <button className="flex flex-col items-center gap-1 rounded-2xl bg-[#5E55FF] px-4 py-1.5 text-sm text-white transition-transform hover:scale-105 z-10">
                        <Image src={lodge_projects_icon} width={24} alt="Lodge link to all projects icon" />
                        <Link href={"#"} className="irsans_reg text-xs">پروژه ها</Link>
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-2xl bg-[#5E55FF] px-4 py-1.5 text-sm text-white transition-transform hover:scale-105 z-10">
                        <Image src={lodge_licenses_icon} width={24} alt="Lodge link to all projects icon" />
                        <Link href={"#"} className="irsans_reg text-xs">گواهینامه ها</Link>
                    </button>
                    <button className="flex flex-col items-center gap-1 rounded-2xl bg-[#5E55FF] px-4 py-1.5 text-sm text-white transition-transform hover:scale-105 z-10">
                        <Image src={lodge_connect_icon} width={32} alt="Lodge link to all projects icon" />
                        <Link href={"#"} className="irsans_reg text-xs">راه های ارتباطی</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Lodge