"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Navbar Component
 * 
 * Clean, minimal navigation for single-page portfolio.
 * - Scroll-based navigation on homepage
 * - Standard links on other pages
 * - Mobile hamburger menu
 */
export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const isHome = pathname === "/";

    // Navigation items - scroll sections on homepage, regular links elsewhere
    const navItems = isHome ? [
        { name: "About", path: "#about" },
        { name: "Experience", path: "#experience" },
        { name: "Projects", path: "#projects" },
        { name: "Contact", path: "#contact" },
    ] : [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/#projects" },
        { name: "Contact", path: "/#contact" },
    ];

    // Handle smooth scrolling for hash links
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (path.startsWith("#")) {
            e.preventDefault();
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Name */}
                    <Link
                        href="/"
                        className="text-lg font-bold text-white tracking-tight hover:text-emerald-400 transition-colors"
                    >
                        GeeksLab
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                onClick={(e) => handleClick(e, item.path)}
                                className="text-sm text-neutral-400 hover:text-white transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/10"
                    >
                        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleClick(e, item.path)}
                                    className="text-lg text-neutral-400 hover:text-white transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
