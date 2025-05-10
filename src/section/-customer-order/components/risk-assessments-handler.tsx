import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RiskAssessmentGrading from "../../-risk-assessment/component/risk-assessment-grading";
import { CustomerOrderRiskAssessment } from "../../model/customer-order-risk-assessment";
import styles from '../style/customer-order.module.css';
import { colorRiskAssessment1, colorRiskAssessment2, colorRiskAssessment3, colorRiskAssessment4, colorRiskAssessment5, colorRiskAssessmentSkipped } from "../../style/colors";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { RiskCategory } from "../../util/constants";

export default function RiskAssessmentsHandler({
    loading,
    riskCategories,
    riskAssessments,
    onRiskAssessmentClose,
    onRiskAssessmentUpdate,
    onRiskAssessmentSave,
    onRiskAssessmentDelete
}: {
    loading: boolean,
    riskCategories: string[],
    riskAssessments: CustomerOrderRiskAssessment[],
    onRiskAssessmentClose: () => void,
    onRiskAssessmentUpdate: (riskAssessment: CustomerOrderRiskAssessment) => void,
    onRiskAssessmentSave: (riskAssessment: CustomerOrderRiskAssessment) => void,
    onRiskAssessmentDelete: (riskAssessmentId: string) => void,
}) {
    const [expandedRiskAssessmentId, setExpandedRiskAssessmentId] = useState<string>("");

    const getRiskAssessmentColor = (riskAssessment: CustomerOrderRiskAssessment) => {
        const riskSeriousness = riskAssessment.chance! * riskAssessment.impact!;
        switch (true) {
            case (riskSeriousness === 0):
                return colorRiskAssessmentSkipped
            case (riskSeriousness < 4):
                return colorRiskAssessment1
            case (riskSeriousness < 8):
                return colorRiskAssessment2
            case (riskSeriousness < 15):
                return colorRiskAssessment3
            case (riskSeriousness < 21):
                return colorRiskAssessment4
            default:
                return colorRiskAssessment5
        }
    }

    const handleExpandedRiskAssessment = (riskAssessmentId?: string | undefined) => {
        if (riskAssessmentId === expandedRiskAssessmentId) {
            setExpandedRiskAssessmentId("");
        } else {
            setExpandedRiskAssessmentId(riskAssessmentId ?? "")
        }

        onRiskAssessmentClose();
    }

    const handleRiskAssessmentSkip = (riskAssessment: CustomerOrderRiskAssessment) => {
        const riskAssessmentSkip = { ...riskAssessment };
        riskAssessmentSkip.chance = 0;
        riskAssessmentSkip.impact = 0;
        riskAssessmentSkip.isSkipped = true;
        onRiskAssessmentUpdate(riskAssessmentSkip);
        onRiskAssessmentSave(riskAssessmentSkip);
    }

    return (
        <>            
            {riskCategories?.map(riskCategoryName => {
                return <div key={riskCategoryName} className={styles.riskCategory} >
                    <h3>{riskCategoryName}</h3>
                    {riskAssessments
                        .filter(riskAssessment => riskAssessment.riskCategoryName === riskCategoryName)
                        .map(riskAssessment => {
                            return <Accordion
                                key={riskAssessment.id}
                                id={`risk-assessment-${riskAssessment.id}`}
                                expanded={expandedRiskAssessmentId === riskAssessment.id}
                                onChange={() => handleExpandedRiskAssessment(riskAssessment.id)}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    {riskAssessment.chance! * riskAssessment.impact! > 0 ? 
                                        <RadioButtonCheckedIcon sx={{ marginRight: '1rem', color: getRiskAssessmentColor(riskAssessment) }} /> : 
                                        <RadioButtonUncheckedIcon sx={{ marginRight: '1rem', color: getRiskAssessmentColor(riskAssessment) }} />
                                    }
                                    <Typography sx={{ textAlign: 'left' }} >
                                        {riskAssessment.riskTitle}
                                    </Typography>
                                </AccordionSummary>
                                {expandedRiskAssessmentId === riskAssessment.id && <AccordionDetails>
                                    <RiskAssessmentGrading
                                        riskAssessment={riskAssessment}
                                        compact={true}
                                        onRiskAssessmentChange={onRiskAssessmentUpdate}
                                    />
                                    <div className={styles.riskAssessmentButtonWrapper}>
                                        <LoadingButton
                                            sx={{ marginTop: '1rem', width: '120px'}}
                                            variant="contained"
                                            disabled={loading}
                                            onClick={() => onRiskAssessmentSave(riskAssessment)}
                                        >
                                            Spara
                                        </LoadingButton>
                                        {riskAssessment.isSkipped === false && <LoadingButton
                                            sx={{ marginTop: '1rem', width: '120px'}}
                                            variant="outlined"
                                            disabled={loading}
                                            onClick={() => handleRiskAssessmentSkip(riskAssessment)}
                                        >
                                            Hoppa över
                                        </LoadingButton>}
                                        {riskAssessment.isSkipped === true && riskAssessment.riskCategoryId === RiskCategory.Customer && <LoadingButton
                                            sx={{ marginTop: '1rem', width: '120px'}}
                                            variant="outlined"
                                            disabled={loading}
                                            onClick={() => onRiskAssessmentDelete(riskAssessment.id!)}
                                        >
                                            Ta bort
                                        </LoadingButton>}
                                    </div>
                                </AccordionDetails>}
                            </Accordion>
                        })
                    }
                </div>
            })}
        </>
    );
}