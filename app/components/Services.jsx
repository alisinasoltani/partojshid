export default function Services() {
    return (
        <div className="bg-white text-black pt-[5rem] flex flex-col justify-start items-center">
            <h2 className="services-title text-3xl font-bold pt-[4rem]">خدمات ما</h2>
            <div className="service-container grid grid-cols-4 grid-rows-1 gap-[3px] text-center place-content-center
            my-[4rem] h-[40rem]">
                <div className="grid col-span-1 place-content-center px-10 bg-[rgba(20,20,20,0.4)]">
                    <h3>طراحی و اجرا</h3>
                </div>
                <div className="grid col-span-1 place-content-center bg-[rgba(20,20,20,0.1)]">
                    <h3>پروژه های پیش فروش</h3>
                </div>
                <div className="grid col-span-1 place-content-center bg-[rgba(20,20,20,0.1)]">
                    <h3>پروژه های فعال</h3>
                </div>
                <div className="grid col-span-1 place-content-center bg-[rgba(20,20,20,0.1)]">
                    <h3>مشارکت در ساخت</h3>
                </div>
            </div>
        </div>
    )
}