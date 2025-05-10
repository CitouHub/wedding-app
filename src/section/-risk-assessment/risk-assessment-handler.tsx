import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ViewLoader from "../../component/view-loader/view-loader";
import StepCounter from "../../component/step-counter/step-counter";
import { useParams } from "react-router-dom";
import { getConstructionProject } from "../service/construction-project-service";
import { CustomerOrderRiskAssessment } from "../model/customer-order-risk-assessment";
import { ConstructionProject } from "../model/construction-project";
import { Risk } from "../model/risk";
import { getRisks } from "../service/risk-service";
import { addCustomer } from "../service/customer-service";
import RiskAssessmentGrading from "./component/risk-assessment-grading";
import { ConstructionProjectParam, PARAMETER_CUSTOMER_ORDER_ID, ROUTE_PATH_CONSTRUCTION_PROJECT, ROUTE_PATH_CUSTOMER_ORDER } from "../../infrastructure/route";
import BaseForm from "../../component/form/base-form";
import { Customer } from "../model/customer";
import { customerFieldDefinitions } from "./field-description/customer-field-definition";
import { CustomerOrderAdd } from "../model/customer-order-add";
import BaseControl from "../../component/control/base-control";
import styles from "./style/risk-assessment.module.css";
import { addCustomerOrder } from "../service/customer-order-service";

export default function RiskAssessmentHandler() {
    const params = useParams<keyof ConstructionProjectParam>();
    const constructionProjectId = Number(params.constructionProjectId);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [constructionProject, setConstructionProject] = useState<ConstructionProject | undefined>(undefined);
    const [risks, setRisks] = useState<Risk[]>([]);
    const [riskAssessments, setRiskAssessments] = useState<CustomerOrderRiskAssessment[]>([]);
    const [currentRiskIndex, setCurrentRiskIndex] = useState<number>(0);
    const [customer, setCustomer] = useState<Customer>({});

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const getConstructionProjectCall = getConstructionProject(Number(constructionProjectId))
        const getRisksCall = getRisks(Number(constructionProjectId));

        Promise.all([getConstructionProjectCall, getRisksCall]).then(result => {
            setConstructionProject(result[0])
            setRisks(result[1]);

            setLoading(false);
        });
    }, [constructionProjectId]);

    const handleRiskAssessmentChange = (riskAssessment: CustomerOrderRiskAssessment) => {
        const riskAssessmentsUpdate = riskAssessments.filter(_ => _.riskTitle !== riskAssessment.riskTitle)
        riskAssessmentsUpdate.push(riskAssessment)
        setRiskAssessments(riskAssessmentsUpdate)
    }

    const handleSkipRisk = () => {
        const risk = risks[currentRiskIndex];
        const riskAssessment = riskAssessments[currentRiskIndex];
        const skippedRiskAssessment: CustomerOrderRiskAssessment = {
            id: riskAssessment?.id,
            riskTitle: risk?.title ?? riskAssessment!.riskTitle,
            riskDescription: risk?.description ?? riskAssessment?.riskDescription,
            riskCategoryId: risk?.riskCategoryId ?? riskAssessment!.riskCategoryId,
            riskCategoryName: risk?.riskCategoryName ?? riskAssessment!.riskCategoryName,
            chance: 0,
            impact: 0,
            isSkipped: true
        }
        handleRiskAssessmentChange(skippedRiskAssessment);
        setCurrentRiskIndex(currentRiskIndex + 1);
    }

    const handleComplete = () => {
        setSubmitting(true);
        addCustomer(customer).then((result) => {
            const customerOrderAdd: CustomerOrderAdd = {
                constructionProjectId: constructionProjectId,
                customerId: result.id,
                customerProjectDescription: customer.projectDescription,
                riskAssessments: riskAssessments
            }
            addCustomerOrder(customerOrderAdd).then(result => {
                setSubmitting(false);
                navigate(ROUTE_PATH_CUSTOMER_ORDER.replace(PARAMETER_CUSTOMER_ORDER_ID, result.id));
            });
        })
    }

    return (
        <>
            <ViewLoader loading={loading} />
            {loading === false && <div className={styles.assessmentContent} >
                <h2>{constructionProject?.title}</h2>
                <StepCounter
                    steps={risks.length}
                    stepsComplete={currentRiskIndex}
                    text={`Bedömda risker ${currentRiskIndex} av ${risks.length}`}
                />

                {currentRiskIndex < risks.length && <>
                    <h3>{risks[currentRiskIndex]?.title}</h3>
                    <RiskAssessmentGrading
                        risk={risks[currentRiskIndex]}
                        riskAssessment={riskAssessments.find(_ => _.riskTitle === risks[currentRiskIndex].title)}
                        onRiskAssessmentChange={(riskAssessment) => handleRiskAssessmentChange(riskAssessment)}
                    />
                    <BaseControl
                        leftButtonActive={true}
                        leftButtonText={currentRiskIndex > 0 ? "Föregåend" : "Välj projekt"}
                        leftButtonIcon={<ArrowBackIcon />}
                        onLeftButtonClick={() => {
                            if (currentRiskIndex > 0) {
                                setCurrentRiskIndex(currentRiskIndex - 1)
                            } else {
                                navigate(ROUTE_PATH_CONSTRUCTION_PROJECT)
                            }
                        }}

                        middleButtonActive={true}
                        middleButtonText={"Hoppa över"}
                        onMiddleButtonClick={handleSkipRisk}

                        rightButtonActive={true}
                        rightButtonText={"Nästa"}
                        rightButtonIcon={<ArrowForwardIcon />}
                        rightButtonDisable={
                            riskAssessments.find(_ => _.riskTitle === risks[currentRiskIndex].title)?.chance === undefined ||
                            riskAssessments.find(_ => _.riskTitle === risks[currentRiskIndex].title)?.impact === undefined
                        }
                        onRightButtonClick={() => setCurrentRiskIndex(currentRiskIndex + 1)}
                    />
                </>}
                
                {currentRiskIndex === risks.length && <BaseForm 
                    model={customer}
                    fields={customerFieldDefinitions}
                    setModel={setCustomer}

                    submitButtonText="Slutför"
                    submitIcon={<ArrowForwardIcon />}
                    onSubmitButtonClick={handleComplete}
                    submitting={submitting}
                
                    cancelButtonText="Tillbaka"
                    cancelIcon={<ArrowBackIcon />}
                    onCancelButtonClick={() => setCurrentRiskIndex(currentRiskIndex - 1)}
                />}
            </div>}
        </>
    );
}
