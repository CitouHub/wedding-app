import { handleResponse } from "../util/api/response-handler";
import { HttpMethod, requestOptions } from "../util/api/option/request-options";
import { Customer } from "../model/customer";

export async function addCustomer(customer: Customer): Promise<Customer> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customer`, requestOptions(HttpMethod.POST, customer));
    return handleResponse<Customer>(response);
}

export async function getCustomer(customerId: string): Promise<Customer> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customer/${customerId}`, requestOptions(HttpMethod.GET));
    return handleResponse<Customer>(response);
}

export async function updateCustomer(customer: Customer): Promise<Customer> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customer`, requestOptions(HttpMethod.PUT, customer));
    return handleResponse<Customer>(response);
}