"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "../context/language-context";

/**
 * Enhanced Navbar Component
 * 
 * Premium navigation with:
 * - Active section indicator (tracks scroll position)
 * - Underline hover animation
 * - Hide on scroll down, show on scroll up
 * - Clean, spacious design
 */
export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isHome = pathname === "/";
    const { language, t } = useLanguage();

    const { scrollY } = useScroll();

    // Hide navbar on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    // Track active section based on scroll position
    useEffect(() => {
        if (!isHome) return;

        const sections = ["hero", "about", "experience", "projects", "skills", "contact"];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [isHome]);

    // Navigation items
    const navItems = isHome ? [
        { name: t('nav.about'), path: "#about", section: "about" },
        { name: language === 'es' ? "Experiencia" : "Experience", path: "#experience", section: "experience" },
        { name: t('nav.projects'), path: "#projects", section: "projects" },
        { name: t('nav.contact'), path: "#contact", section: "contact" },
    ] : [
        { name: t('nav.home'), path: "/", section: "" },
        { name: t('nav.projects'), path: "/#projects", section: "" },
        { name: t('nav.contact'), path: "/#contact", section: "" },
    ];

    // Handle smooth scrolling
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (path.startsWith("#")) {
            e.preventDefault();
            const element = document.querySelector(path);
            if (element) {
                const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
                element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
            }
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
                : "bg-transparent"
                }`}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-6xl mx-auto px-8 lg:px-12">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="group">
                        <span className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                            GeeksLab
                        </span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                href={item.path}
                                isActive={activeSection === item.section}
                                onClick={(e) => handleClick(e, item.path)}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side: Language + CTA */}
                    <div className="hidden lg:flex items-center gap-6">
                        <LanguageToggle />

                        {/* CTA Button - More prominent */}
                        <a
                            href="mailto:tonymora1982@gmail.com?subject=Project%20Inquiry"
                            className="px-6 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-emerald-400 hover:text-black transition-all duration-300 hover:scale-105"
                        >
                            {language === 'es' ? 'Contrátame' : 'Hire Me'}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </motion.div>
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
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-white/5"
                    >
                        <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-4">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleClick(e, item.path)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`text-3xl font-medium py-2 transition-colors ${activeSection === item.section
                                        ? "text-emerald-400"
                                        : "text-neutral-400 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <LanguageToggle />
                            </div>

                            {/* Mobile CTA */}
                            <motion.a
                                href="mailto:tonymora1982@gmail.com?subject=Project%20Inquiry"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                                className="mt-4 px-8 py-4 text-center text-lg font-semibold bg-white text-black rounded-full hover:bg-emerald-400 transition-colors"
                            >
                                {language === 'es' ? 'Contrátame' : 'Hire Me'}
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

/**
 * NavLink Component - Individual nav item with underline animation
 */
function NavLink({
    href,
    isActive,
    onClick,
    children
}: {
    href: string;
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="relative px-5 py-3 text-[15px] font-medium transition-colors group"
        >
            <span className={isActive ? "text-white" : "text-neutral-400 group-hover:text-white transition-colors duration-300"}>
                {children}
            </span>

            {/* Active indicator - dot */}
            <motion.span
                className="absolute -bottom-1 left-1/2 w-1 h-1 bg-emerald-400 rounded-full"
                initial={false}
                animate={{
                    scale: isActive ? 1 : 0,
                    x: "-50%"
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Hover underline */}
            <span className="absolute bottom-1 left-5 right-5 h-px bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </a>
    );
}
