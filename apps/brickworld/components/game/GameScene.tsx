"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { BuildingGrid } from "./BuildingGrid";
import { PlacedBlocks } from "./PlacedBlocks";
import { GhostBlock } from "./GhostBlock";
import { ThemedSkybox } from "./ThemedSkybox";
import { useThemeStore } from "@/store/theme-store";

/**
 * GameScene Component
 * Main 3D scene with camera, lighting, grid, blocks, and themed skybox
 */
export default function GameScene() {
    const { currentTheme } = useThemeStore();

    return (
        <Canvas
            camera={{
                position: [12, 12, 12],
                fov: 50,
                near: 0.1,
                far: 1000,
            }}
            shadows
            className="w-full h-full"
        >
            {/* Themed skybox/background */}
            <ThemedSkybox theme={currentTheme} />

            {/* Ambient light - adjusted per theme */}
            <ambientLight
                intensity={currentTheme.id === "halloween" ? 0.2 : 0.5}
                color={currentTheme.id === "halloween" ? "#6644aa" : "#ffffff"}
            />

            {/* Main directional light for shadows */}
            <directionalLight
                position={[10, 20, 10]}
                intensity={currentTheme.id === "halloween" ? 0.6 : 1}
                color={
                    currentTheme.id === "christmas" ? "#cceeff" :
                        currentTheme.id === "halloween" ? "#ff8844" :
                            currentTheme.id === "valentine" ? "#ffccdd" :
                                "#ffffff"
                }
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />

            {/* Secondary fill light */}
            <directionalLight
                position={[-10, 10, -10]}
                intensity={0.3}
                color={
                    currentTheme.id === "christmas" ? "#aaddff" :
                        currentTheme.id === "halloween" ? "#4422aa" :
                            currentTheme.id === "valentine" ? "#ffaacc" :
                                "#8888ff"
                }
            />

            {/* Building grid - themed colors */}
            <BuildingGrid
                gridColor={currentTheme.gridColor}
                groundColor={currentTheme.groundColor}
            />

            {/* All placed blocks */}
            <PlacedBlocks />

            {/* Ghost preview of block to be placed */}
            <GhostBlock />

            {/* Camera controls */}
            <OrbitControls
                makeDefault
                minDistance={5}
                maxDistance={50}
                maxPolarAngle={Math.PI / 2.1}
                enablePan={true}
                panSpeed={0.5}
                rotateSpeed={0.5}
                zoomSpeed={0.5}
            />

            {/* Orientation helper */}
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
        </Canvas>
    );
}
