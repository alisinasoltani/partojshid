import { ShaderBackground } from "@/components/hero-shader";
import Image from "next/image";
import hero_image from "@/public/images/hero.png";


export default function DemoOne() {
    return (
        <div className="relative w-full z-10">
            <ShaderBackground>
                <div className="w-full absolute z-20 top-[50%] flex justify-center items-center gap-4">
                    <div className="irsans_bold text-6xl md:text-8xl bg-linear-to-t from-[#5E55FF] to-black bg-clip-text text-transparent pb-4">
                        پرتو جی شید
                    </div>
                    <div>
                        <Image src={hero_image} width={200} alt="jeyshid hero image" />
                    </div>
                </div>
            </ShaderBackground>
        </div>
    )
}