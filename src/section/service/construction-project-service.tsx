import { handleResponse } from "../util/api/response-handler";
import { ConstructionProject } from "../model/construction-project";
import { requestOptions, HttpMethod } from "../util/api/option/request-options";

export async function getConstructionProjects(): Promise<ConstructionProject[]> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/constructionproject/list/`, requestOptions(HttpMethod.GET));
    return handleResponse<ConstructionProject[]>(response);
}

export async function getConstructionProject(constructionProjectId: number): Promise<ConstructionProject> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/constructionproject/${constructionProjectId}`, requestOptions(HttpMethod.GET));
    return handleResponse<ConstructionProject>(response);
}