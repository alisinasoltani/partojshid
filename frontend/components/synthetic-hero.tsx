"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
// import { useGSAP } from "@gsap/react";
import Image from "next/image";
// import hero_image from "@/public/images/hero.png";
import hero_image from "@/public/images/partoLogo2.png";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CanvasRecorder from "./CanvasRecorder";

// FIX 1: Corrected plugin registration
gsap.registerPlugin(SplitText);

const LOOP_DURATION = 20;

interface ShaderPlaneProps {
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [key: string]: { value: unknown } };
}

// RESTORED: ShaderPlane component definition
const ShaderPlane = ({
    vertexShader,
    fragmentShader,
    uniforms,
}: ShaderPlaneProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size } = useThree();

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;

            const t = state.clock.elapsedTime % LOOP_DURATION;

            material.uniforms.u_time.value = t * 0.5;
            material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.FrontSide}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
};

// RESTORED: vertexShader string
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// RESTORED: fragmentShader string
const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform vec3 u_resolution;
  uniform sampler2D u_channel0;

  vec2 toPolar(vec2 p) {
      float r = length(p);
      float a = atan(p.y, p.x);
      return vec2(r, a);
  }

  vec2 fromPolar(vec2 polar) {
      return vec2(cos(polar.y), sin(polar.y)) * polar.x;
  }

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 p = 6.0 * ((fragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y);

      vec2 polar = toPolar(p);
      float r = polar.x;
      float a = polar.y;

      vec2 i = p;
      float c = 0.0;
      float rot = r + u_time + p.x * 0.100;
      for (float n = 0.0; n < 4.0; n++) {
          float rr = r + 0.15 * sin(u_time*0.7 + float(n) + r*2.0);
          p *= mat2(
              cos(rot - sin(u_time / 10.0)), sin(rot),
              -sin(cos(rot) - u_time / 10.0), cos(rot)
          ) * -0.25;

          float t = r - u_time / (n + 30.0);
          i -= p + sin(t - i.y) + rr;

          c += 2.2 / length(vec2(
              (sin(i.x + t) / 0.15),
              (cos(i.y + t) / 0.15)
          ));
      }

      c /= 8.0;

    //   vec3 baseColor = vec3(0.0196, 0.0275, 0.1882);
      vec3 baseColor = vec3(0.7176, 0.7176, 0.7176);
      vec3 finalColor = mix(vec3(0.98,0.98,0.98), baseColor, smoothstep(0.0, 1.0, c * 0.6));

      fragColor = vec4(finalColor, 1.0);
  }

  void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
  }
`;

interface HeroProps {
    title: string;
    description: string;
    badgeText?: string;
    badgeLabel?: string;
    ctaButtons?: Array<{ text: string; href?: string; primary?: boolean }>;
    microDetails?: Array<string>;
}

const SyntheticHero = ({
    title,
    description,
}: HeroProps) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const badgeWrapperRef = useRef<HTMLDivElement | null>(null);
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const ctaRef = useRef<HTMLDivElement | null>(null);
    const microRef = useRef<HTMLUListElement | null>(null);
    const shaderUniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector3(1, 1, 1) },
        }),
        [],
    );

    return (
        <section
            ref={sectionRef}
            className="relative flex items-center justify-center min-h-screen w-full overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <color attach="background" args={['#ffffff']} />
                    <ShaderPlane
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        uniforms={shaderUniforms}
                    />
                    <CanvasRecorder />
                </Canvas>
            </div>

            <div className="relative z-50 flex flex-col items-center text-center px-6">
                <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-8 md:gap-4">
                    <Image src={hero_image} alt="hero image" width={200} />
                    <h1
                        ref={headingRef}
                        className="irsans_bold text-6xl md:text-8xl font-black bg-linear-to-t from-[#5E55FF] to-black bg-clip-text text-transparent max-w-4xl pb-4"
                    >
                        {title}
                    </h1>
                </div>

                <p
                    ref={paragraphRef}
                    className="text-emerald-50/80 text-lg max-w-2xl mx-auto mb-10 font-light"
                >
                    {description}
                </p>
            </div>
        </section>
    );
};

export default SyntheticHero;