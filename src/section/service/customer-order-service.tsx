import { handleResponse } from "../util/api/response-handler";
import { HttpMethod, requestOptions } from "../util/api/option/request-options";
import { CustomerOrderRiskAssessment } from "../model/customer-order-risk-assessment";
import { CustomerOrder } from "../model/customer-order";
import { CustomerOrderUpdate } from "../model/customer-order-update";
import { CustomerOrderAdd } from "../model/customer-order-add";

export async function addCustomerOrder(customerOrderAdd: CustomerOrderAdd): Promise<CustomerOrder> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customerorder`, requestOptions(HttpMethod.POST, customerOrderAdd));
    return handleResponse<CustomerOrder>(response);
}

export async function getCustomerOrder(customerOrderId: string): Promise<CustomerOrder> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customerorder/${customerOrderId}`, requestOptions(HttpMethod.GET));
    return handleResponse<CustomerOrder>(response);
}

export async function updateCustomerOrder(customerOrderUpdate: CustomerOrderUpdate): Promise<CustomerOrder> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customerorder`, requestOptions(HttpMethod.PUT, customerOrderUpdate));
    return handleResponse<CustomerOrder>(response);
}

export async function upsertCustomerOrderRiskAssessment(customerOrderId: string, customerOrderRiskAssessment: CustomerOrderRiskAssessment): Promise<CustomerOrderRiskAssessment> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customerorder/${customerOrderId}/risk/assessment`, requestOptions(HttpMethod.PUT, customerOrderRiskAssessment));
    return handleResponse<CustomerOrderRiskAssessment>(response);
}

export async function deleteCustomerOrderRiskAssessment(customerOrderId: string, customerOrderRiskAssessmentId: string): Promise<void> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/v1/customerorder/${customerOrderId}/risk/assessment/${customerOrderRiskAssessmentId}`, requestOptions(HttpMethod.DELETE));
    return handleResponse(response);
}