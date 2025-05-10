import { dateTimeReviver } from "../helper/json-helper";
import { ApiError } from "./api-error";
import { ApiErrorResponse } from "./api-error-response";

export function handleResponse<TResponse>(response: Response) {
    if (!response.ok) {
        return handleFailedResponse(response);
    } else {
        return response.text().then((content) => {
            if (content !== '' && isJson(content)) {
                return JSON.parse(content, dateTimeReviver);
            } else {
                return content;
            }
        }) as TResponse
    }
}

export function handleResponseNoContent(response: Response) {
    if (!response.ok) {
        return handleFailedResponse(response);
    }
}

function isJson(value: string) {
    try {
        JSON.parse(value);
    } catch {
        return false;
    }
    return true;
}

function handleFailedResponse(response: Response) {
    if (response.status === 400) {
        throw new ApiError({ errorCode: 400, errorDescription: "Bad request" });
    } else if (response.status === 404) {
        throw new ApiError({ errorCode: 404, errorDescription: "Not found" });
    } else if (response.status === 409) {
        throw new ApiError({ errorCode: 409, errorDescription: "Conflict" });
    } else {
        return (response.json() as Promise<ApiErrorResponse>).then(result => {
            throw new ApiError(result);
        })
    }
}