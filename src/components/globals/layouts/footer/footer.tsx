import { Vercel } from "@/components/svgs";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export function Footer({
    className,
    ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
    return (
        <footer
            className={cn(
                "flex justify-center border-t border-border/10 p-5",
                className
            )}
            {...props}
        >
            <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()}{" "}
                    <Link
                        type="link"
                        href="https://itsdrvgo.me"
                        className="underline"
                    >
                        DRVGO
                    </Link>
                    . All rights reserved.
                </p>

                <div className="flex items-center gap-2 text-sm">
                    <p>Powered by</p>
                    <Vercel width={70.75} height={16} />
                </div>
            </div>
        </footer>
    );
}
