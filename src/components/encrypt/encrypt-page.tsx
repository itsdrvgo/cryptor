"use client";

import { encryptText } from "@/lib/react-query";
import { cn, handleClientError } from "@/lib/utils";
import { EncryptData, encryptSchema } from "@/lib/validation";
import { GenericProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function EncryptPage({ className, ...props }: GenericProps) {
    const [encryptedText, setEncryptedText] = useState<string>("");
    const [decryptionKey, setDecryptionKey] = useState<string>("");
    const [isTextCopied, setIsTextCopied] = useState<boolean>(false);
    const [isKeyCopied, setIsKeyCopied] = useState<boolean>(false);

    const form = useForm<EncryptData>({
        resolver: zodResolver(encryptSchema),
        defaultValues: {
            message: "",
        },
    });

    useEffect(() => {
        setTimeout(() => {
            if (isTextCopied) {
                setIsTextCopied(false);
            }
        }, 4000);

        setTimeout(() => {
            if (isKeyCopied) {
                setIsKeyCopied(false);
            }
        }, 4000);
    }, [isTextCopied, isKeyCopied]);

    const { mutate: encrypt, isPending } = useMutation({
        onMutate: () => {
            const toastId = toast.loading("Encrypting message...");
            return { toastId };
        },
        mutationFn: encryptText,
        onSuccess: (data, _, { toastId }) => {
            setEncryptedText(data.text);
            setDecryptionKey(data.key);

            toast.success("Message encrypted successfully", {
                id: toastId,
            });
        },
        onError: (err, _, ctx) => {
            return handleClientError(err, ctx?.toastId);
        },
    });

    const handleKeyCopy = () => {
        navigator.clipboard.writeText(decryptionKey);
        setIsKeyCopied(true);
        toast.success("Copied decryption key to clipboard");
    };

    const handleTextCopy = () => {
        navigator.clipboard.writeText(encryptedText);
        setIsTextCopied(true);
        toast.success("Copied encrypted text to clipboard");
    };

    return (
        <div className={cn("space-y-4", className)} {...props}>
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Encrypt</h1>
                <p className="text-sm text-muted-foreground">
                    Encrypt a message and share it with your friends
                </p>
            </div>

            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={(...args) =>
                        form.handleSubmit((data) => encrypt(data))(...args)
                    }
                >
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter your message here..."
                                        minRows={4}
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="w-full"
                        type="submit"
                        isLoading={isPending}
                        isDisabled={isPending}
                    >
                        Encrypt
                    </Button>
                </form>
            </Form>

            {decryptionKey && (
                <div className="w-full space-y-2">
                    <Label>Decryption Key</Label>
                    <div className="group relative rounded-md bg-card p-3 text-xs">
                        <p className="w-full max-w-[90%] select-none break-words">
                            {decryptionKey}
                        </p>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border bg-muted opacity-0 hover:bg-muted/60 group-hover:opacity-100"
                            onClick={handleKeyCopy}
                        >
                            {isKeyCopied ? (
                                <Icons.check className="size-4 text-foreground/60" />
                            ) : (
                                <Icons.clipboard className="size-4 text-foreground/60" />
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {encryptedText && (
                <div className="w-full space-y-2">
                    <Label>Encrypted Text</Label>
                    <div className="group relative rounded-md bg-card p-3 text-xs">
                        <p className="w-full max-w-[90%] select-none break-words">
                            {encryptedText}
                        </p>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-2 rounded-sm border bg-muted opacity-0 hover:bg-muted/60 group-hover:opacity-100"
                            onClick={handleTextCopy}
                        >
                            {isTextCopied ? (
                                <Icons.check className="size-4 text-foreground/60" />
                            ) : (
                                <Icons.clipboard className="size-4 text-foreground/60" />
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
