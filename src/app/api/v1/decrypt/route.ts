import { EncryptionSystem } from "@/lib/encryptor";
import { CResponse, handleError } from "@/lib/utils";
import { decryptSchema } from "@/lib/validation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const { key, text } = decryptSchema.parse(payload);

        const formattedKey = key.replace(/^`/, "").replace(/`$/, "").trim();
        const formattedText = text
            .replace(/^```/, "")
            .replace(/```$/, "")
            .trim();

        const message = EncryptionSystem.decrypt(formattedText, formattedKey);

        return CResponse({
            message: "OK",
            data: {
                message,
            },
        });
    } catch (err) {
        return handleError(err);
    }
}
