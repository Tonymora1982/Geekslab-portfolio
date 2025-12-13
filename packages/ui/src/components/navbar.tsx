"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Circle } from "lucide-react";
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
 * - Availability status badge
 * - Smooth mobile menu
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
                ? "bg-black/90 backdrop-blur-lg border-b border-white/10"
                : "bg-transparent"
                }`}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    {/* Logo + Status */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <span className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                            GeeksLab
                        </span>
                        {/* Availability indicator */}
                        <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                            <Circle className="w-2 h-2 fill-emerald-400/80 text-emerald-400/80" />
                            <span className="text-[10px] text-neutral-300 font-medium uppercase tracking-wider">
                                {language === 'es' ? 'Disponible' : 'Available'}
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
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

                        <LanguageToggle />

                        {/* CTA Button */}
                        <a
                            href="mailto:tonymora1982@gmail.com?subject=Project%20Inquiry"
                            className="ml-4 px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                            Hire Me
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10"
                    >
                        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col gap-2">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.path}
                                    href={item.path}
                                    onClick={(e) => handleClick(e, item.path)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`text-2xl font-medium py-2 transition-colors ${activeSection === item.section
                                        ? "text-emerald-300"
                                        : "text-neutral-400 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}

                            <div className="mt-4">
                                <LanguageToggle />
                            </div>

                            {/* Mobile CTA */}
                            <motion.a
                                href="mailto:tonymora1982@gmail.com?subject=Project%20Inquiry"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                                className="mt-4 px-6 py-3 text-center text-lg font-medium bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors"
                            >
                                Hire Me
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
            className="relative px-4 py-2 text-sm transition-colors group"
        >
            <span className={isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}>
                {children}
            </span>

            {/* Underline indicator */}
            <motion.span
                className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-400/60 rounded-full"
                initial={false}
                animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                style={{ originX: 0.5 }}
            />

            {/* Hover underline */}
            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/20 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </a>
    );
}
