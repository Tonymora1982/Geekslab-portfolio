"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const Sticker = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    return (
        <motion.div
            drag
            dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
            dragElastic={0.3}
            dragTransition={{ 
                bounceStiffness: 300, 
                bounceDamping: 25,
                power: 0.2,
                timeConstant: 300
            }}
            whileHover={{ 
                scale: 1.15, 
                rotate: 5,
                cursor: "grab",
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ 
                scale: 0.92, 
                cursor: "grabbing",
                rotate: -5
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{
                y: [0, -20, 0, -15, 0],
                x: [0, 10, 0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8,
                delay,
                y: {
                    duration: 8 + delay * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 0.5
                },
                x: {
                    duration: 6 + delay * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 0.3
                },
                rotate: {
                    duration: 10 + delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay * 0.7
                }
            }}
            className={`absolute p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const DraggableShapes = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
                {/* AI Brain Graphic */}
                <motion.div
                    drag
                    dragConstraints={{ left: -800, right: 800, top: -600, bottom: 600 }}
                    dragElastic={0.4}
                    dragMomentum={true}
                    dragTransition={{ 
                        bounceStiffness: 200, 
                        bounceDamping: 20,
                        power: 0.3,
                        timeConstant: 400
                    }}
                    whileHover={{ 
                        scale: 1.08, 
                        cursor: "grab",
                        filter: "brightness(1.2) drop-shadow(0 0 50px rgba(255,100,200,0.5))",
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    whileDrag={{ 
                        scale: 1.05,
                        cursor: "grabbing",
                        filter: "brightness(1.1)",
                        transition: { duration: 0.1 }
                    }}
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                        y: [0, -25, 0, -15, 0],
                        x: [0, 12, 0, -12, 0],
                        rotate: [0, 3, 0, -3, 0],
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        duration: 1.2,
                        y: {
                            duration: 14,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        x: {
                            duration: 11,
                            repeat: Infinity,
                            ease: "easeInOut"
                        },
                        rotate: {
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative w-[300px] h-[200px] drop-shadow-2xl">
                        <Image
                            src="/assets/graphics/Cerebro.png"
                            alt="AI Brain"
                            fill
                            className="object-contain"
                            draggable={false}
                        />
                    </div>
                </motion.div>

                {/* Robot Graphic */}
                <motion.div
                    drag
                    dragConstraints={{ left: -800, right: 800, top: -600, bottom: 600 }}
                    dragElastic={0.4}
                    dragMomentum={true}
                    dragTransition={{ 
                        bounceStiffness: 200, 
                        bounceDamping: 20,
                        power: 0.3,
                        timeConstant: 400
                    }}
                    whileHover={{ 
                        scale: 1.08, 
                        cursor: "grab",
                        filter: "brightness(1.2) drop-shadow(0 0 50px rgba(100,200,255,0.5))",
                        transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    whileDrag={{ 
                        scale: 1.05,
                        cursor: "grabbing",
                        filter: "brightness(1.1)",
                        transition: { duration: 0.1 }
                    }}
                    initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    animate={{
                        y: [0, -20, 0, -10, 0],
                        x: [0, -15, 0, 15, 0],
                        rotate: [0, -4, 0, 4, 0],
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        duration: 1.2,
                        delay: 0.3,
                        y: {
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        },
                        x: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3
                        },
                        rotate: {
                            duration: 16,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.7
                        }
                    }}
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative w-[250px] h-[250px] drop-shadow-2xl">
                        <Image
                            src="/assets/graphics/Robot.png"
                            alt="Robot"
                            fill
                            className="object-contain"
                            draggable={false}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
