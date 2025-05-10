export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

export const requestOptions = (httpMethod: HttpMethod, content?: unknown | undefined) => {
    return {
        method: HttpMethod[httpMethod],
            headers: {
            "Content-Type": "application/json"
        },
        body: content !== undefined ? JSON.stringify(content) : undefined
    }
}