export default function Services() {
    return (
        <div className="bg-white pt-[5rem] flex flex-col justify-start items-center">
            <h2 className="services-title text-[53px] font-bold pt-[4rem] titr text-black">خدمات ما</h2>
            <div className="service-container grid grid-cols-9 grid-rows-1 gap-[3px] text-center place-content-center
            my-[4rem] h-[40rem] text-[25px] roya">
                <div className="grid col-span-2 place-content-center px-10 bg-[rgba(20,20,20,0.2)]">
                    <h3>طراحی و اجرا</h3>
                </div>
                <div className="grid col-span-3 place-content-center bg-[rgba(20,20,20,0.2)]">
                    <h3>پروژه های پیش فروش</h3>
                </div>
                <div className="grid col-span-2 place-content-center bg-[rgba(20,20,20,0.2)]">
                    <h3>پروژه های فعال</h3>
                </div>
                <div className="grid col-span-2 place-content-center bg-[rgba(20,20,20,0.2)]">
                    <h3>مشارکت در ساخت</h3>
                </div>
            </div>
        </div>
    );
}