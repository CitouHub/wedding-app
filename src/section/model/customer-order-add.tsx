import { CustomerOrderRiskAssessment } from "./customer-order-risk-assessment";

export interface CustomerOrderAdd {
    constructionProjectId: number,
    customerId?: string | undefined,
    customerProjectDescription?: string | undefined,
    riskAssessments: CustomerOrderRiskAssessment[]
}