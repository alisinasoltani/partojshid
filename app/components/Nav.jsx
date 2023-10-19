import Image from "next/image"
import partoLogo from "@/public/partoLogo.png"

export default function Nav() {
    return (
        <div className="navbar flex flex-row justify-between px-[7rem] py-4 bg-white text-black" style={{direction: "rtl"}}>
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
    )
}