import {
    AlertTriangle,
    Check,
    ChevronRight,
    Clipboard,
    ExternalLink,
    Loader2,
    Lock,
    Menu,
    Unlock,
    type IconNode as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
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
