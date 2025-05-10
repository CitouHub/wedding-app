import { CustomerOrderRiskAssessment } from "./customer-order-risk-assessment";

export interface CustomerOrder {
    id: string,
    customerId: string,
    customerProjectDescription: string,
    constructionProjectTitle: string,
    constructionProjectDescription?: string | undefined,
    riskAssessments: CustomerOrderRiskAssessment[]
}