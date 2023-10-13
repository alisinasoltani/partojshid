import Image from "next/image"
import ejals from "@/public/images/ejlas2_about.png"
import field from "@/public/images/field_about.png"

export default function About() {
    return (
        <div className="grid grid-rows-1 grid-cols-12 bg-white text-black">
            <div className="md:grid grid-rows-1 grid-cols-2 hidden row-span-1 md:col-span-7 gap-10">
                <div className="grid justify-end pt-[8rem]">
                    <Image src={ejals} height={500} alt="Ejlas Project by Parto Jeyshid" />
                </div>
                <div className="grid pb-[8rem]">
                    <Image src={field} height={500} alt="Ejlas Project by Parto Jeyshid" />
                </div>
            </div>
            <div className="flex flex-col justify-start items-end gap-5 row-span-1 md:col-span-5 col-span-12 text-right">
                <h2 className="flex titr text-[45px] h-fit w-fit font-bold mt-[6rem] mr-[7rem]">درباره ما</h2>
                <span className="flex roya text-[25px] mr-[4rem]" style={{direction: 'rtl'}}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی...
                </span>
            </div>
        </div>
    )
}