import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Service {
    id: number;
    title: string;
    videoUrl: string;
    initialGrow: number;
    finalGrow: number;
}


const Services = ({ input }: { input: Service[] }) => {
    const containerRef = useRef<HTMLElement>(null);
    const cellRefs = useRef<HTMLDivElement[]>([]);
    cellRefs.current = [];

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cellRefs.current.includes(el)) {
            cellRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {

            ScrollTrigger.matchMedia({
                '(min-width: 768px)': function () {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 30%',
                            end: 'bottom top',
                            toggleActions: 'play reverse play reverse',
                        },
                    });

                    // Animate the flex-grow property for each cell
                    tl.to(cellRefs.current[0], { flexGrow: input[0].finalGrow, duration: 1, ease: 'power2.inOut' })
                        .to(cellRefs.current[1], { flexGrow: input[1].finalGrow, duration: 1, ease: 'power2.inOut' }, '<')
                        .to(cellRefs.current[2], { flexGrow: input[2].finalGrow, duration: 1, ease: 'power2.inOut' }, '<')
                        .to(cellRefs.current[3], { flexGrow: input[3].finalGrow, duration: 1, ease: 'power2.inOut' }, '<');
                },

                '(max-width: 767px)': function () {
                    cellRefs.current.forEach(cell => {
                        gsap.set(cell, { clearProps: 'flexGrow' });
                    });
                }
            });
        }, containerRef);

        // Cleanup function
        return () => ctx.revert();
    }, []);

    const handleHoverStart = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            // Using a promise to handle potential play() interruptions
            video.play().catch(error => {
                console.warn("Video play was interrupted.", error);
            });
        }
    };

    const handleHoverEnd = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    return (
        <section
            ref={containerRef}
            className="w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
            <div className="flex items-center justify-center mb-12">
                <div
                    className="w-28 h-1 z-10"
                    style={{ backgroundColor: '#5E55FF' }}
                ></div>
                <h2 className="text-3xl md:text-4xl irsans_bold text-gray-900 mx-6 shrink-0 z-10">
                    خدمات ما
                </h2>
                <div
                    className="w-28 h-1 z-10"
                    style={{ backgroundColor: '#5E55FF' }}
                ></div>
            </div>

            <div className="flex flex-col place-items-center gap-4">
                {/* Row 1 */}
                <div className="w-[70vw] md:w-[50vw] flex flex-col md:flex-row gap-4 md:h-[300px]">
                    {input.slice(0, 2).map((service) => (
                        <div
                            key={service.id}
                            ref={addToRefs}
                            // NEW: Added event handlers and classes
                            onMouseEnter={handleHoverStart}
                            onMouseLeave={handleHoverEnd}
                            className="service-card rounded-2xl flex justify-center items-center p-8 shadow-lg relative overflow-hidden z-10" // Added relative & overflow-hidden
                            style={{
                                flexGrow: service.initialGrow,
                                flexBasis: 0,
                            }}>
                            <video
                                src={service.videoUrl}
                                muted
                                playsInline
                                loop
                                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                            />
                            <h3 className="text-white text-3xl irsans_med text-center drop-shadow-md relative">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Row 2 */}
                <div className="w-[70vw] md:w-[50vw] flex flex-col md:flex-row gap-4 md:h-[300px]">
                    {input.slice(2, 4).map((service) => (
                        <div
                            key={service.id}
                            ref={addToRefs}
                            // NEW: Added event handlers and classes
                            onMouseEnter={handleHoverStart}
                            onMouseLeave={handleHoverEnd}
                            className="service-card rounded-2xl flex justify-center items-center p-8 shadow-lg relative overflow-hidden z-10" // Added relative & overflow-hidden
                            style={{
                                flexGrow: service.initialGrow,
                                flexBasis: 0,
                            }}>
                            <video
                                src={service.videoUrl}
                                muted // Mutes video
                                playsInline
                                loop
                                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                            />
                            <h3 className="text-white text-3xl irsans_med text-center drop-shadow-md relative">
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;