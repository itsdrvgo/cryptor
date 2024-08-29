import { EncryptionSystem } from "@/lib/encryptor";
import { CResponse, handleError } from "@/lib/utils";
import { encryptSchema } from "@/lib/validation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const { message } = encryptSchema.parse(payload);
        const { encryptedText, key } = EncryptionSystem.encrypt(message);

        return CResponse({
            message: "OK",
            data: {
                text: encryptedText,
                key,
            },
        });
    } catch (err) {
        return handleError(err);
    }
}
