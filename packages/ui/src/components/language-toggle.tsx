"use client";

import { useLanguage } from "../context/language-context";
import { motion } from "framer-motion";

export const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="relative px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors overflow-hidden"
        >
            <span className="relative z-10 flex items-center gap-2">
                <span className={language === 'en' ? "text-black dark:text-white font-bold" : "opacity-50"}>EN</span>
                <span className="opacity-30">/</span>
                <span className={language === 'es' ? "text-black dark:text-white font-bold" : "opacity-50"}>ES</span>
            </span>
        </button>
    );
};
