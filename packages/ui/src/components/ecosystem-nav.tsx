"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FlaskConical, FileText, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
    href: string;
    label: string;
    icon: React.ReactNode;
    colorClass: string;
    delay: number;
}

const NavItem = ({ href, label, icon, colorClass, delay }: NavItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Link 
                href={href} 
                className="group flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
                <span className={`p-1 rounded-full bg-white/5 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </span>
                <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {label}
                </span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
            </Link>
        </motion.div>
    );
};

export const EcosystemNav = ({ t }: { t: (key: string) => string }) => {
    return (
        <div className="flex flex-col items-center gap-4 mb-12">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium"
            >
                {t('hero.ecosystem_tagline')}
            </motion.p>

            <div className="flex flex-wrap justify-center gap-3">
                <NavItem
                    href="/portfolio"
                    label={t('hero.cta_portfolio')}
                    icon={<LayoutGrid className="w-3 h-3" />}
                    colorClass="text-cyan-400"
                    delay={3.3}
                />
                <NavItem
                    href="/cv"
                    label={t('hero.cta_cv')}
                    icon={<FileText className="w-3 h-3" />}
                    colorClass="text-emerald-400"
                    delay={3.4}
                />
                <NavItem
                    href="/lab"
                    label={t('hero.cta_lab')}
                    icon={<FlaskConical className="w-3 h-3" />}
                    colorClass="text-purple-400"
                    delay={3.5}
                />
            </div>
        </div>
    );
};
