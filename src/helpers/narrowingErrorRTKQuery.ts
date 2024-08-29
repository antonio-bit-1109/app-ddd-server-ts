import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { toast } from "react-toastify";

// l errore "error" ritornato da RTK QUERY nell hook query o mutation deve essere tipizzato indicando che tipo di errore sta ritornando la fetch
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "status" in error;
}

export function WhatKindStatusError(
    error: number | "FETCH_ERROR" | "CUSTOM_ERROR" | "PARSING_ERROR" | "TIMEOUT_ERROR"
) {
    if (error === "FETCH_ERROR") {
        return "FETCH_ERROR"; /* toast.error("FETCH_ERROR"); */
    }
    if (error === "CUSTOM_ERROR") {
        return "CUSTOM_ERROR"; /* toast.error("CUSTOM_ERROR"); */
    }
    if (error === "PARSING_ERROR") {
        return "PARSING_ERROR"; /* toast.error("PARSING_ERROR"); */
    }
    if (error === "TIMEOUT_ERROR") {
        return "TIMEOUT_ERROR"; /* toast.error("TIMEOUT_ERROR"); */
    }
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
        typeof error === "object" &&
        error != null &&
        "message" in error &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (error as any).message === "string"
    );
}

export function handleErrorCases(error: unknown /* , isToastPresent?: boolean */) {
    if (!isFetchBaseQueryError(error)) {
        return "si è verificato un errore. errore non FetchBaseQueryError";
    }

    const queryErr = error.data;
    const queryStatus = error.status;

    console.log(queryErr);
    console.log(queryStatus);
    if (queryStatus && !queryErr) {
        return WhatKindStatusError(queryStatus);
    }

    if (!isErrorWithMessage(queryErr)) {
        return "si è verificato un errore. no message in fetchBaseQuery error";
    }

    const errMsg = queryErr.message;

    return errMsg;
}
