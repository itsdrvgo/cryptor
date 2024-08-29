import { z } from "zod";

export const encryptSchema = z.object({
    message: z.string().min(1, "Message must be at least 1 character long."),
});

export const decryptSchema = z.object({
    text: z
        .string()
        .min(1, "Encrypted text must be at least 1 character long."),
    key: z.string().min(1, "Key must be at least 1 character long."),
});

export type EncryptData = z.infer<typeof encryptSchema>;
export type DecryptData = z.infer<typeof decryptSchema>;
