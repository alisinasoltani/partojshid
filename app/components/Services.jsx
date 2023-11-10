'use client'
import { useEffect, useState } from "react";
import { Linear, gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Services() {
    const [service, setService] = useState([0]);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.set('.service-overlay', {
            width: '100%',
            height: '0%',
            backgroundColor: 'rgba(20,20,20,0.3)',
            position: 'absolute',
            bottom: 0,
            left: 0,
        })
        const tl = gsap.timeline();
        gsap.set('.service-container', {
            backgroundImage: "url(/images/activeProjects.jpg)",
        });
        gsap.set('.service', {
            backgroundColor: 'rgba(20,20,20,0.2)',
        });
        gsap.to('.service-trigger', {
            scrollTrigger: {
                trigger: '.service-trigger',
                start: 'top-=200px center',
                end: 'center-=200px center',
                scrub: true,
                toggleActions: 'play none none reverse',
            },
            '--serviceTitleBefore': '53px',
            '--serviceTitleAfter': '53px',
        });
        switch (service[0]) {
            case 0:
                tl.to('#activeService', {
                    height: '100%',
                }, '<').to('#designService', {
                    height: '0%',
                }, '<').to('#contributionService', {
                    height: '0%',
                }, '<').to('#preorderService', {
                    height: '0%',
                }, '<');
                // .to('.service-container', {
                //     duration: 2,
                //     ease: Linear.easeInOut,
                // }, {
                //     backgroundImage: "url(/images/activeProjects.jpg)",
                // });
                gsap.set('.service-container', {
                    backgroundImage: "url(/images/activeProjects.jpg)",
                });
            break;
            case 1:
                tl.to('#activeService', {
                    height: '0%',
                }, '<').to('#designService', {
                    height: '100%',
                }, '<').to('#contributionService', {
                    height: '0%',
                }, '<').to('#preorderService', {
                    height: '0%',
                }, '<');
                gsap.set('.service-container', {
                    backgroundImage: "url(/images/DesignAndExe.jpg)",
                });
                // tl.to('.service-container', {
                    //     duration: 2,
                    //     ease: Linear.easeInOut,
                    // }, {
                        //     backgroundImage: design,
                        // });
            break;
            case 2:
                tl.to('#activeService', {
                    height: '0%',
                }, '<').to('#designService', {
                    height: '0%',
                }, '<').to('#contributionService', {
                    height: '100%',
                }, '<').to('#preorderService', {
                    height: '0%',
                }, '<');
                gsap.set('.service-container', {
                    backgroundImage: "url(/images/Coperation.jpg)",
                });
                // tl.to('.service-container', {
                    //     duration: 2,
                    //     ease: Linear.easeInOut,
                    // }, {
                        //     backgroundImage: constructionContribution,
                        // });
            break;
            case 3:
                tl.to('#activeService', {
                    height: '0%',
                }, '<').to('#designService', {
                    height: '0%',
                }, '<').to('#contributionService', {
                    height: '0%',
                }, '<').to('#preorderService', {
                    height: '100%',
                }, '<');
                gsap.set('.service-container', {
                    backgroundImage: "url(/images/PreOrder.jpg)",
                });
                // tl.to('.service-container', {
                //     duration: 2,
                //     ease: Linear.easeInOut,
                // }, {
                //     backgroundImage: preorderProjects,
                // });
            break;
            default:
                break;
        }
        tl.play();
    }, [service]);

    const setActiveService = () => {
        setService([0]);
    };
    const setDesignService = () => {
        setService([1]);
    }
    const setContributionService = () => {
        setService([2]);
    }
    const setPreorderService = () => {
        setService([3]);
    };

    return (
        <div className="service-trigger bg-white pt-[5rem] flex flex-col justify-start items-center">
            <h2 className="services-title text-[53px] font-bold pt-[4rem] yekanb text-black">فعالیت ها</h2>
            <div className="service-container grid grid-cols-9 grid-rows-1 gap-[3px] text-center place-content-center
            my-[4rem] md:h-[42rem] h-[70vh] lg:text-[25px] md:text-[20px] yekanb">
                <div className="service grid col-span-2 place-content-center bg-[rgba(20,20,20,0.2)] px-10" onMouseEnter={setDesignService}>
                    <div className="service-overlay" id="designService"></div>
                    <h3 className="z-[1]">طراحی و اجرا</h3>
                </div>
                <div className="service grid col-span-3 place-content-center bg-[rgba(20,20,20,0.2)] transition-colors" onMouseEnter={setPreorderService}>
                    <div className="service-overlay" id="preorderService"></div>
                    <h3 className="z-[1]">پروژه های پیش فروش</h3>
                </div>
                <div className="service grid col-span-2 place-content-center bg-[rgba(20,20,20,0.2)] transition-colors" onMouseEnter={setActiveService}>
                    <div className="service-overlay" id="activeService"></div>
                    <h3 className="z-[1]">پروژه های فعال</h3>
                </div>
                <div className="service grid col-span-2 place-content-center bg-[rgba(20,20,20,0.2)] transition-colors" onMouseEnter={setContributionService}>
                    <div className="service-overlay" id="contributionService"></div>
                    <h3 className="z-[1]">مشارکت در ساخت</h3>
                </div>
            </div>
        </div>
    );
}