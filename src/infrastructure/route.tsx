export const PARAMETER_CONSTRUCTION_PROJECT_ID = ":constructionProjectId";
export const PARAMETER_CUSTOMER_ORDER_ID = ":customerOrderId";
export const PARAMETER_TRACK_INDEX = ":trackIndex";

export const ROUTE_PATH_WELCOME = "/";
export const ROUTE_PATH_CONSTRUCTION_PROJECT = "/construction-project";
export const ROUTE_PATH_RISK_ASSESSMENT = `/risk/assessment/construction-project/${PARAMETER_CONSTRUCTION_PROJECT_ID}`;
export const ROUTE_PATH_CUSTOMER_ORDER = `/customer/order/${PARAMETER_CUSTOMER_ORDER_ID}`;
export const ROUTE_PATH_CUSTOMER_ORDER_ADD_RISK = `/customer/order/add/risk/${PARAMETER_CUSTOMER_ORDER_ID}`;
export const ROUTE_PATH_TRACK = `/track/${PARAMETER_TRACK_INDEX}`;

export interface CustomerOrderParam {
    customerOrderId: string
}

export interface ConstructionProjectParam {
    constructionProjectId: string
}