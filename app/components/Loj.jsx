import Image from "next/image";
import LojLogo from "@/public/images/Lodge2.png";

export default function Loj() {
    return (
        <div className="loj flex flex-row justify-between items-end h-[35rem] px-[6rem]">
            <Image className="pb-[6rem]" src={LojLogo} width={320} alt="Loj Logo" />
            <h2 className="text-[68px] pb-[12rem] titr">گروه ساختمانی لژ</h2>
        </div>
    );
}