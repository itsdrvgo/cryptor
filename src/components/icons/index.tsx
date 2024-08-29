import {
    AlertTriangle,
    Check,
    ChevronRight,
    Clipboard,
    ExternalLink,
    Github,
    Loader2,
    Lock,
    Menu,
    Star,
    Unlock,
    type IconNode as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
    star: Star,
    github: Github,
    menu: Menu,
    unlock: Unlock,
    lock: Lock,
    externalLink: ExternalLink,
    check: Check,
    clipboard: Clipboard,
    chevronRight: ChevronRight,
    spinner: Loader2,
    warning: AlertTriangle,
};
