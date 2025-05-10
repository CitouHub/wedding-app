export interface CustomerOrderRiskAssessment {
    id?: string | undefined,
    riskTitle?: string | undefined,
    riskDescription?: string | undefined,
    riskCategoryId: number,
    riskCategoryName: string,
    chance?: number | undefined,
    impact?: number | undefined,
    isSkipped: boolean
}