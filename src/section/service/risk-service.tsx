import { handleResponse } from "../util/api/response-handler";
import { Risk } from "../model/risk";
import { HttpMethod, requestOptions } from "../util/api/option/request-options";

export async function getRisks(constructionProjectId: number): Promise<Risk[]> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/risk/list/${constructionProjectId}`, requestOptions(HttpMethod.GET));
    return handleResponse<Risk[]>(response);
}