import { cFetch } from "../utils";
import { DecryptData, EncryptData, ResponseData } from "../validation";

export async function encryptText(data: EncryptData) {
    const response = await cFetch<ResponseData<DecryptData>>(
        "/api/v1/encrypt",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.status) throw new Error(response.longMessage);
    if (!response.data) throw new Error("No data received");
    return response.data;
}

export async function decryptText(data: DecryptData) {
    const response = await cFetch<ResponseData<EncryptData>>(
        "/api/v1/decrypt",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.status) throw new Error(response.longMessage);
    if (!response.data) throw new Error("No data received");
    return response.data;
}
