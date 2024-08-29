import { EncryptPage } from "@/components/encrypt";
import { GeneralShell } from "@/components/globals/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Encryptor - Encrypt anything",
    description: "Encrypt a message and share it with your friends.",
};

function Page() {
    return (
        <GeneralShell>
            <EncryptPage />
        </GeneralShell>
    );
}

export default Page;
