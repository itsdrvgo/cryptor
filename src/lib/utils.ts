import { clsx, type ClassValue } from "clsx";
import { NextResponse } from "next/server";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";
import {
    DecryptionFailedError,
    InvalidEncryptedTextFormatError,
    InvalidKeyLengthError,
} from "./encryptor";
import { ResponseMessages } from "./validation";

export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAbsoluteURL(path: string = "/") {
    if (process.env.VERCEL_URL)
        return "https://" + process.env.VERCEL_URL + path;
    return "http://localhost:" + (process.env.PORT ?? 3000) + path;
}

export function handleClientError(error: unknown, toastId?: string | number) {
    if (error instanceof ZodError)
        return toast.error(error.issues.map((x) => x.message).join(", "), {
            id: toastId,
        });
    else if (error instanceof InvalidKeyLengthError)
        return toast.error(error.message, {
            id: toastId,
        });
    else if (error instanceof InvalidEncryptedTextFormatError)
        return toast.error(error.message, {
            id: toastId,
        });
    else if (error instanceof DecryptionFailedError)
        return toast.error(error.message, {
            id: toastId,
        });
    else if (error instanceof Error)
        return toast.error(error.message, {
            id: toastId,
        });
    else console.error(error);
    return toast.error("Something went wrong, try again later!", {
        id: toastId,
    });
}

export function handleError(err: unknown) {
    console.error(err);
    if (err instanceof ZodError)
        return CResponse({
            message: "UNPROCESSABLE_ENTITY",
            longMessage: err.issues.map((x) => x.message).join(", "),
        });
    else if (err instanceof InvalidKeyLengthError)
        return CResponse({
            message: "BAD_REQUEST",
            longMessage: err.message,
        });
    else if (err instanceof InvalidEncryptedTextFormatError)
        return CResponse({
            message: "BAD_REQUEST",
            longMessage: err.message,
        });
    else if (err instanceof DecryptionFailedError)
        return CResponse({
            message: "BAD_REQUEST",
            longMessage: err.message,
        });
    else if (err instanceof Error)
        return CResponse({
            message: "BAD_REQUEST",
            longMessage: err.message,
        });
    else
        return CResponse({
            message: "INTERNAL_SERVER_ERROR",
            longMessage: "An unknown error occurred.",
        });
}

export async function cFetch<T>(
    url: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}

export function CResponse<T>({
    message,
    longMessage,
    data,
}: {
    message: ResponseMessages;
    longMessage?: string;
    data?: T;
}) {
    let code: number;
    let status = false;

    switch (message) {
        case "OK":
            code = 200;
            status = true;
            break;
        case "ERROR":
            code = 400;
            break;
        case "UNAUTHORIZED":
            code = 401;
            break;
        case "FORBIDDEN":
            code = 403;
            break;
        case "NOT_FOUND":
            code = 404;
            break;
        case "BAD_REQUEST":
            code = 400;
            break;
        case "CONFLICT":
            code = 409;
            break;
        case "TOO_MANY_REQUESTS":
            code = 429;
            break;
        case "INTERNAL_SERVER_ERROR":
            code = 500;
            break;
        case "SERVICE_UNAVAILABLE":
            code = 503;
            break;
        case "GATEWAY_TIMEOUT":
            code = 504;
            break;
        case "UNKNOWN_ERROR":
            code = 500;
            break;
        case "UNPROCESSABLE_ENTITY":
            code = 422;
            break;
        case "NOT_IMPLEMENTED":
            code = 501;
            break;
        case "CREATED":
            code = 201;
            status = true;
            break;
        case "BAD_GATEWAY":
            code = 502;
            break;
        default:
            code = 500;
            break;
    }

    return NextResponse.json(
        {
            status,
            message,
            longMessage,
            data,
        },
        {
            status: code,
            statusText: message,
        }
    );
}
