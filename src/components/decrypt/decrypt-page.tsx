"use client";

import { decryptText } from "@/lib/react-query";
import { cn, handleClientError } from "@/lib/utils";
import { DecryptData, decryptSchema } from "@/lib/validation";
import { GenericProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function DecryptPage({ className, ...props }: GenericProps) {
    const [decryptedText, setDecryptedText] = useState<string>("");

    const form = useForm<DecryptData>({
        resolver: zodResolver(decryptSchema),
        defaultValues: {
            text: "",
            key: "",
        },
    });

    const { mutate: decrypt, isPending } = useMutation({
        onMutate: () => {
            const toastId = toast.loading("Decrypting message...");
            return { toastId };
        },
        mutationFn: decryptText,
        onSuccess: (data, _, { toastId }) => {
            setDecryptedText(data.message);

            toast.success("Message decrypted successfully!", {
                id: toastId,
            });
        },
        onError: (err, _, ctx) => {
            return handleClientError(err, ctx?.toastId);
        },
    });

    return (
        <div className={cn("space-y-4", className)} {...props}>
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold">Decrypt</h1>
                <p className="text-sm text-muted-foreground">
                    Decrypt your encrypted text here by entering the key and the
                    encrypted text.
                </p>
            </div>

            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={(...args) =>
                        form.handleSubmit((data) => decrypt(data))(...args)
                    }
                >
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Encrypted Text</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter the encrypted text here..."
                                        minRows={4}
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="key"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Key</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter the key here..."
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
                        Decrypt
                    </Button>
                </form>
            </Form>

            {decryptedText && (
                <div className="w-full space-y-2">
                    <Label>Original Message</Label>
                    <div className="rounded-md bg-card p-3">
                        <p
                            className="w-full max-w-[90%] select-none"
                            dangerouslySetInnerHTML={{
                                __html: convertNewlinesToBreaks(decryptedText),
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function convertNewlinesToBreaks(text: string): string {
    return text.replace(/\n/g, "<br>");
}
