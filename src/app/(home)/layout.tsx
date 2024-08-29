import { Navbar, NavbarMob } from "@/components/globals/layouts";
import { siteConfig } from "@/config/site";
import { LayoutProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Cryptor - Encrypt any text",
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
};

function Layout({ children }: LayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <NavbarMob />
        </div>
    );
}

export default Layout;
