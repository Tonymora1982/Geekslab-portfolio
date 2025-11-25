"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useRef } from "react";
import anime from "animejs";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "../context/language-context";

export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const { t } = useLanguage();

    const navItems = [
        { name: t('nav.home'), path: "/" },
        { name: t('nav.projects'), path: "/#projects" },
        { name: t('nav.contact'), path: "/contact" },
    ];

    const handleMouseEnter = (index: number) => {
        if (navRefs.current[index]) {
            anime({
                targets: navRefs.current[index],
                scale: 1.05,
                color: "#ffffff",
                duration: 400,
                easing: "easeOutExpo"
            });
        }
    };

    const handleMouseLeave = (index: number) => {
        if (navRefs.current[index]) {
            anime({
                targets: navRefs.current[index],
                scale: 1,
                color: "#737373", // neutral-500
                duration: 400,
                easing: "easeOutExpo"
            });
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
                        AMP
                    </Link>

                    {/* Menu Button (All Screens) */}
                    <div className="flex items-center gap-4">
                        <LanguageToggle />
                        <button
                            className="p-2 text-neutral-400 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-24 left-0 right-0 bg-black border-b border-white/10 p-4"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        "text-xl font-bold transition-colors hover:text-white",
                                        pathname === item.path ? "text-white" : "text-neutral-500"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
