"use client";

import { Icons } from "@/components/icons";
import { Link } from "@/components/ui/link";
import { menu } from "@/config/menu";
import { siteConfig } from "@/config/site";
import { useNavbarStore } from "@/lib/store";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export function Navbar() {
    const [isMenuHidden, setIsMenuHidden] = useState(false);

    const isMenuOpen = useNavbarStore((state) => state.isOpen);
    const setIsMenuOpen = useNavbarStore((state) => state.setIsOpen);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        if (latest > previous && latest > 150) setIsMenuHidden(true);
        else setIsMenuHidden(false);
    });

    return (
        <motion.header
            variants={{
                visible: {
                    y: 0,
                },
                hidden: {
                    y: "-100%",
                },
            }}
            animate={isMenuHidden ? "hidden" : "visible"}
            transition={{
                duration: 0.35,
                ease: "easeInOut",
            }}
            className="sticky inset-x-0 top-0 z-50 flex h-auto w-full items-center justify-center border-b bg-background px-4 py-3 backdrop-blur-md backdrop-saturate-100 md:py-4"
            data-menu-open={isMenuOpen}
        >
            <nav className="flex w-full max-w-5xl items-center justify-between gap-5">
                <Link type="link" href="/" className="text-2xl font-semibold">
                    {siteConfig.name}
                </Link>

                <div className="flex items-center gap-6">
                    <ul className="hidden items-center gap-2 sm:flex md:gap-4">
                        {!!menu.length &&
                            menu.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        type="link"
                                        className="hover:text-foreground/80"
                                        href={item.href}
                                        isExternal={item.isExternal}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>

                    <div className="flex items-center">
                        <button
                            aria-label="Mobile Menu Toggle Button"
                            aria-pressed={isMenuOpen}
                            className="sm:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Icons.menu className="size-6" />
                        </button>
                    </div>
                </div>
            </nav>
        </motion.header>
    );
}
