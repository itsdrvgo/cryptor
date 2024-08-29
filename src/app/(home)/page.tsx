import { DecryptPage } from "@/components/decrypt";
import { GeneralShell } from "@/components/globals/layouts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Decryptor - Decrypt anything",
    description:
        "Decrypt your encrypted text here by entering the key and the encrypted text.",
};

function Page() {
    return (
        <GeneralShell>
            <DecryptPage />
        </GeneralShell>
    );
}

export default Page;
