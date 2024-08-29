import { Icons } from "@/components/icons";

interface Menu {
    name: string;
    href: string;
    isExternal?: boolean;
    icon: keyof typeof Icons;
}

export const menu: Menu[] = [
    {
        name: "Encrypt",
        href: "/encrypt",
        icon: "lock",
    },
    {
        name: "Decrypt",
        href: "/",
        icon: "unlock",
    },
    {
        name: "View Source",
        href: "https://github.com/itsdrvgo/cryptor",
        isExternal: true,
        icon: "github",
    },
];
