"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky, Stars, Cloud } from "@react-three/drei";
import { Mesh } from "three";
import { Theme } from "@/lib/themes";

interface ThemedSkyboxProps {
    theme: Theme;
}

/**
 * ThemedSkybox Component
 * Renders a themed sky/background based on the current theme
 * Each theme has unique atmosphere, lighting, and decorative elements
 */
export function ThemedSkybox({ theme }: ThemedSkyboxProps) {
    switch (theme.id) {
        case "christmas":
            return <ChristmasSky />;
        case "halloween":
            return <HalloweenSky />;
        case "valentine":
            return <ValentineSky />;
        case "easter":
            return <EasterSky />;
        default:
            return <DefaultSky />;
    }
}

/**
 * Default Sky - Clear day with soft clouds
 */
function DefaultSky() {
    return (
        <>
            <Sky
                distance={450000}
                sunPosition={[100, 20, 100]}
                inclination={0.5}
                azimuth={0.25}
                rayleigh={0.5}
            />
            <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        </>
    );
}

/**
 * Christmas Sky - Winter night with stars and moon glow
 */
function ChristmasSky() {
    const moonRef = useRef<Mesh>(null);

    // Subtle moon glow animation
    useFrame((state) => {
        if (moonRef.current) {
            moonRef.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <>
            {/* Dark winter night gradient */}
            <mesh position={[0, 0, -100]} scale={[300, 300, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#0a1628" />
            </mesh>

            {/* Stars - more visible in winter */}
            <Stars
                radius={150}
                depth={60}
                count={3000}
                factor={5}
                saturation={0.1}
                fade
                speed={0.5}
            />

            {/* Moon */}
            <mesh ref={moonRef} position={[30, 25, -50]}>
                <circleGeometry args={[3, 32]} />
                <meshBasicMaterial color="#fffacd" />
            </mesh>

            {/* Moon glow */}
            <mesh position={[30, 25, -51]}>
                <circleGeometry args={[5, 32]} />
                <meshBasicMaterial color="#fffacd" transparent opacity={0.2} />
            </mesh>

            {/* Subtle fog for atmosphere */}
            <fog attach="fog" args={["#0a1628", 30, 80]} />
        </>
    );
}

/**
 * Halloween Sky - Spooky orange/purple dusk with large moon
 */
function HalloweenSky() {
    const moonRef = useRef<Mesh>(null);

    return (
        <>
            {/* Gradient background - orange to purple to black */}
            <mesh position={[0, -20, -100]} scale={[400, 200, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#1a0a20" />
            </mesh>

            {/* Upper sky - dark purple */}
            <mesh position={[0, 50, -99]} scale={[400, 100, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#2d1f3d" />
            </mesh>

            {/* Horizon glow - orange */}
            <mesh position={[0, -10, -98]} scale={[400, 40, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#4a2020" transparent opacity={0.7} />
            </mesh>

            {/* Large creepy moon */}
            <mesh ref={moonRef} position={[-20, 20, -50]}>
                <circleGeometry args={[6, 32]} />
                <meshBasicMaterial color="#ffcc66" />
            </mesh>

            {/* Moon crater details */}
            <mesh position={[-18, 21, -49]}>
                <circleGeometry args={[1, 16]} />
                <meshBasicMaterial color="#cc9933" transparent opacity={0.5} />
            </mesh>
            <mesh position={[-21, 19, -49]}>
                <circleGeometry args={[0.8, 16]} />
                <meshBasicMaterial color="#cc9933" transparent opacity={0.4} />
            </mesh>

            {/* Sparse eerie stars */}
            <Stars
                radius={100}
                depth={50}
                count={500}
                factor={3}
                saturation={0}
                fade
                speed={0.3}
            />

            {/* Purple fog */}
            <fog attach="fog" args={["#1a0a15", 25, 70]} />
        </>
    );
}

/**
 * Valentine Sky - Romantic sunset/dusk with warm colors
 */
function ValentineSky() {
    return (
        <>
            {/* Gradient background - pink to purple */}
            <mesh position={[0, 0, -100]} scale={[400, 200, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#2d1a2d" />
            </mesh>

            {/* Sunset horizon glow */}
            <mesh position={[0, -15, -98]} scale={[400, 60, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#4a2a3a" transparent opacity={0.8} />
            </mesh>

            {/* Warm pink accent */}
            <mesh position={[0, -25, -97]} scale={[400, 30, 1]}>
                <planeGeometry />
                <meshBasicMaterial color="#8b4060" transparent opacity={0.5} />
            </mesh>

            {/* Romantic stars */}
            <Stars
                radius={120}
                depth={50}
                count={1500}
                factor={4}
                saturation={0.5}
                fade
                speed={0.8}
            />

            {/* Soft pink fog */}
            <fog attach="fog" args={["#2d1a2d", 35, 90]} />
        </>
    );
}

/**
 * Easter Sky - Bright spring day with fluffy clouds
 */
function EasterSky() {
    return (
        <>
            {/* Bright blue sky */}
            <Sky
                distance={450000}
                sunPosition={[50, 50, 50]}
                inclination={0.6}
                azimuth={0.1}
                rayleigh={1}
                turbidity={8}
            />

            {/* Fluffy clouds */}
            <Cloud
                position={[-15, 15, -30]}
                speed={0.2}
                opacity={0.7}
                width={10}
                depth={3}
                segments={20}
            />
            <Cloud
                position={[20, 12, -25]}
                speed={0.3}
                opacity={0.6}
                width={8}
                depth={2}
                segments={15}
            />
            <Cloud
                position={[0, 18, -35]}
                speed={0.15}
                opacity={0.5}
                width={12}
                depth={4}
                segments={25}
            />

            {/* Light pastel fog */}
            <fog attach="fog" args={["#e8f4f8", 50, 120]} />
        </>
    );
}
