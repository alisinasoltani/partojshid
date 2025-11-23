"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import hero_image from "@/public/images/hero.png";

interface NestedSquaresProps {
    count?: number;
    baseSize?: number;
    paddingIncrement?: number;
    animationDuration?: number;
    staggerDelay?: number;
    className?: string;
}

function seededRandom(seed: number) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const NestedSquares: React.FC<NestedSquaresProps> = ({
    count = 25,
    baseSize = 50,
    paddingIncrement = 10,
    animationDuration = 2,
    staggerDelay = 0.1,
    className = ""
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Add keyframes animation to document
        const styleEl = document.createElement("style");
        styleEl.textContent = `
      @keyframes scaleRotate {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(2) rotate(45deg);
    opacity: 0.8;
  }
}

    `;
        document.head.appendChild(styleEl);

        // Start animation after component mounts
        const timer = setTimeout(() => {
            setIsAnimating(true);
        }, 100);

        return () => {
            document.head.removeChild(styleEl);
            clearTimeout(timer);
        };
    }, []);

    const generateSquares = () => {
        const squares = [];

        for (let i = 0; i < count; i++) {
            const padding = i * paddingIncrement;
            const size = baseSize + (padding * 2);
            const delay = i * staggerDelay;
            const initialRotation = i * 15;

            squares.push(
                <div
                    key={i}
                    className="absolute border-2 rounded-lg"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        padding: `${padding}px`,
                        top: '50%',
                        left: '50%',
                        marginTop: `-${size / 2}px`,
                        marginLeft: `-${size / 2}px`,
                        borderImage: `linear-gradient(45deg,
                            rgb(60, 60, 60),     /* dark gray (matches darkest purple) */
                            rgb(100, 100, 100),  /* mid-dark gray */
                            rgb(180, 180, 180),  /* light gray highlight */
                            rgb(120, 120, 120),  /* medium gray */
                            rgb(80, 80, 80)      /* dark gray accent */
                            ) 1`,
                        borderImageSlice: 1,
                        animation: isAnimating
                            ? `scaleRotate ${animationDuration}s ease-in-out ${delay}s forwards`
                            : 'none',
                        transform: `scale(0) rotate(${initialRotation}deg)`,
                        opacity: 0,
                        transformOrigin: 'center center',
                        zIndex: count - i,
                    }}
                />
            );
        }

        return squares;
    };

    return (
        <div className={`w-full min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-purple-500/10"
                        style={{
                            width: seededRandom(i * 10) * 4 + 2,
                            top: seededRandom(i * 20) * 100,
                            height: `${Math.random() * 4 + 2}px`,
                            left: `${Math.random() * 100}%`,
                            boxShadow: "0 0 10px 2px rgba(147, 51, 234, 0.1)",
                            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <div className="relative flex flex-col items-center z-100 justify-center">
                <div className="w-full absolute z-20 top-[50%] flex justify-center items-center gap-4">
                    <div className="irsans_bold text-6xl md:text-8xl bg-linear-to-t from-[#5E55FF] to-black bg-clip-text text-transparent pb-4">
                        پرتو جی شید
                    </div>
                    <div>
                        <Image src={hero_image} width={200} alt="jeyshid hero image" />
                    </div>
                </div>
            </div>

            {/* Add floating animation */}
            <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
        </div>
    );
};

export default function NestedSquaresDemo() {
    return <NestedSquares />;
}
