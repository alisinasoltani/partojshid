import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        id: 1,
        title: 'طراحی و اجرا',
        videoUrl: '/videos/design.mp4', // 1. UPDATED: Use your video path
        initialGrow: 1,
        finalGrow: 1 // Top-left (smaller)
    },
    {
        id: 2,
        title: 'مشارکت در ساخت',
        videoUrl: '/videos/construction.mp4', // 2. UPDATED: Use your video path
        initialGrow: 1,
        finalGrow: 2 // Top-right (larger)
    },
    {
        id: 3,
        title: 'پروژه های پیش فروش',
        videoUrl: '/videos/presale.mp4', // 3. UPDATED: Use your video path
        initialGrow: 1,
        finalGrow: 2 // Bottom-left (larger)
    },
    {
        id: 4,
        title: 'پروژه های فعال',
        videoUrl: '/videos/active.mp4', // 4. UPDATED: Use your video path
        initialGrow: 1,
        finalGrow: 1 // Bottom-right (smaller)
    },
];


const Services = () => {
    const containerRef = useRef<HTMLElement>(null); // Added type for containerRef
    const cellRefs = useRef<HTMLDivElement[]>([]); // Explicitly type the ref's current value
    cellRefs.current = []; // Clear refs array on each render

    // Function to add elements to our refs array (for GSAP)
    const addToRefs = (el: HTMLDivElement | null) => { // Added type for el
        if (el && !cellRefs.current.includes(el)) {
            cellRefs.current.push(el); // This will now work
        }
    };

    // --- GSAP SCROLL ANIMATION (Unchanged) ---
    useEffect(() => {
        // Wait for the component to mount
        if (!containerRef.current) return;

        // Create a GSAP context for safe cleanup
        const ctx = gsap.context(() => {

            // Use matchMedia for responsive animations
            ScrollTrigger.matchMedia({

                // --- DESKTOP ANIMATION ---
                '(min-width: 768px)': function () {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top 30%', // Start animation when 70% of the component is in view
                            end: 'bottom top',
                            toggleActions: 'play reverse play reverse', // Play on enter, reverse on leave
                        },
                    });

                    // Animate the flex-grow property for each cell
                    tl.to(cellRefs.current[0], { flexGrow: services[0].finalGrow, duration: 1, ease: 'power2.inOut' })
                        .to(cellRefs.current[1], { flexGrow: services[1].finalGrow, duration: 1, ease: 'power2.inOut' }, '<')
                        .to(cellRefs.current[2], { flexGrow: services[2].finalGrow, duration: 1, ease: 'power2.inOut' }, '<')
                        .to(cellRefs.current[3], { flexGrow: services[3].finalGrow, duration: 1, ease: 'power2.inOut' }, '<');
                },

                // --- MOBILE STATE ---
                '(max-width: 767px)': function () {
                    // On mobile, clear GSAP-applied 'flexGrow' properties
                    cellRefs.current.forEach(cell => {
                        gsap.set(cell, { clearProps: 'flexGrow' });
                    });
                }
            });
        }, containerRef); // Scope the context to our main container

        // Cleanup function
        return () => ctx.revert();
    }, []);

    // --- NEW: Event Handlers for Video Hover ---

    /**
     * Handles the mouse enter event on a service card.
     * Finds the video element inside the card and plays it.
     */
    const handleHoverStart = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            // Using a promise to handle potential play() interruptions
            video.play().catch(error => {
                console.warn("Video play was interrupted.", error);
            });
        }
    };

    /**
     * Handles the mouse leave event on a service card.
     * Finds the video element, pauses it, and resets its time to the start.
     */
    const handleHoverEnd = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset video to the beginning
        }
    };

    return (
        <section
            ref={containerRef}
            dir="rtl" // Set direction to Right-to-Left for Persian
            className="w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
        >
            {/* Title Section (Unchanged) */}
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

            {/* Services Grid */}
            <div className="flex flex-col place-items-center gap-4">
                {/* Row 1 */}
                <div className="w-[70vw] md:w-[50vw] flex flex-col md:flex-row gap-4 md:h-[300px]">
                    {services.slice(0, 2).map((service) => (
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
                                // REMOVED: backgroundImage
                            }}
                        >
                            {/* NEW: Video Background Element */}
                            <video
                                src={service.videoUrl}
                                muted // Mutes video
                                playsInline // Important for mobile browsers
                                loop // Loops video if hover is long
                                className="absolute top-0 left-0 w-full h-full object-cover -z-10" // Styles as background
                            />
                            <h3 className="text-white text-3xl irsans_med text-center drop-shadow-md relative"> {/* Added relative for stacking */}
                                {service.title}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Row 2 */}
                <div className="w-[70vw] md:w-[50vw] flex flex-col md:flex-row gap-4 md:h-[300px]">
                    {services.slice(2, 4).map((service) => (
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
                                // REMOVED: backgroundImage
                            }}
                        >
                            {/* NEW: Video Background Element */}
                            <video
                                src={service.videoUrl}
                                muted // Mutes video
                                playsInline // Important for mobile browsers
                                loop // Loops video if hover is long
                                className="absolute top-0 left-0 w-full h-full object-cover -z-10" // Styles as background
                            />
                            <h3 className="text-white text-3xl irsans_med text-center drop-shadow-md relative"> {/* Added relative for stacking */}
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