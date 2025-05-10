import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomerOrderRiskAssessment } from "../model/customer-order-risk-assessment";
import BaseForm from "../../component/form/base-form";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerOrderParam, PARAMETER_CUSTOMER_ORDER_ID, ROUTE_PATH_CUSTOMER_ORDER } from "../../infrastructure/route";
import RiskAssessmentGrading from "../-risk-assessment/component/risk-assessment-grading";
import { Risk } from "../model/risk";
import { riskAssessmentAddFieldDefinitions } from "./field-description/risk-assessment-add-field-definition";
import styles from "./style/risk-assessment-add.module.css";
import { upsertCustomerOrderRiskAssessment } from "../service/customer-order-service";
import { RiskCategory } from "../util/constants";

export default function RiskAssessmentAddHandler() {
    const params = useParams<keyof CustomerOrderParam>()
    const customerOrderId = params.customerOrderId || ""

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [riskAssessment, setRiskAssessment] = useState<CustomerOrderRiskAssessment>({
        riskCategoryId: RiskCategory.Customer,
        riskCategoryName: "Egna risker",
        isSkipped: false
    });
    const [risk, setRisk] = useState<Risk>({
        riskCategoryId: RiskCategory.Customer,
        riskCategoryName: "Egna risker"
    });

    const navigate = useNavigate();

    const updateRisk = (risk: Risk) => {
        setRisk(risk);
        setRiskAssessment({ ...riskAssessment, riskTitle: risk.title, riskDescription: risk.description });
    }

    const handleSaveCustomerRiskAssessment = () => {
        setSubmitting(true);
        upsertCustomerOrderRiskAssessment(customerOrderId, riskAssessment).then(() => {
            setSubmitting(false);
            navigate(ROUTE_PATH_CUSTOMER_ORDER
                .replace(PARAMETER_CUSTOMER_ORDER_ID, customerOrderId))
        });
    }

    return (
        <>
            <h3>Lägg till en ny risk</h3>
            <BaseForm 
                model={risk}
                setModel={updateRisk}
                fields={riskAssessmentAddFieldDefinitions}

                submitButtonText="Spara"
                submitIcon={<SaveIcon />}
                onSubmitButtonClick={handleSaveCustomerRiskAssessment}
                submitDisabled={riskAssessment.chance === undefined || riskAssessment.impact === undefined}
                submitting={submitting}
            
                cancelButtonText="Tillbaka"
                cancelIcon={<ArrowBackIcon />}
                onCancelButtonClick={() => navigate(ROUTE_PATH_CUSTOMER_ORDER
                    .replace(PARAMETER_CUSTOMER_ORDER_ID, customerOrderId))}
            >
                <div className={styles.addGradingWrapper}>
                    <RiskAssessmentGrading 
                        risk={risk}
                        riskAssessment={riskAssessment}
                        onRiskAssessmentChange={(riskAssessment) => setRiskAssessment(riskAssessment)}
                    />
                </div>
            </BaseForm>
        </>
    );
}
