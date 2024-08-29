import crypto from "crypto";

export class EncryptionSystem {
    private static readonly ALGORITHM = "aes-256-ccm";
    private static readonly KEY_LENGTH = 32;
    private static readonly NONCE_LENGTH = 12;
    private static readonly AUTH_TAG_LENGTH = 16;

    static encrypt(text: string): { encryptedText: string; key: string } {
        const key = crypto.randomBytes(this.KEY_LENGTH);
        const nonce = crypto.randomBytes(this.NONCE_LENGTH);

        const cipher = crypto.createCipheriv(this.ALGORITHM, key, nonce, {
            authTagLength: this.AUTH_TAG_LENGTH,
        });

        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        const authTag = cipher.getAuthTag();

        const encryptedText =
            nonce.toString("hex") +
            ":" +
            encrypted +
            ":" +
            authTag.toString("hex");

        return {
            encryptedText,
            key: key.toString("hex"),
        };
    }

    static decrypt(encryptedText: string, key: string): string {
        const textParts = encryptedText.split(":");
        const nonce = Buffer.from(textParts[0], "hex");
        const encryptedData = Buffer.from(textParts[1], "hex");
        const authTag = Buffer.from(textParts[2], "hex");

        const decipher = crypto.createDecipheriv(
            this.ALGORITHM,
            Buffer.from(key, "hex"),
            nonce,
            { authTagLength: this.AUTH_TAG_LENGTH }
        );

        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(
            encryptedData.toString("hex"),
            "hex",
            "utf8"
        );
        decrypted += decipher.final("utf8");

        return decrypted;
    }
}

export class InvalidKeyLengthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidKeyLengthError";
    }
}

export class InvalidEncryptedTextFormatError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidEncryptedTextFormatError";
    }
}

export class DecryptionFailedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DecryptionFailedError";
    }
}
