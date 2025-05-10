import GradeSelector from "../../../component/grade-selector/grade-selecor";
import { CustomerOrderRiskAssessment } from "../../model/customer-order-risk-assessment";
import { GradeValue } from "../../../component/grade-selector/model/grade-value";
import styles from '../style/risk-assessment.module.css';
import { Risk } from "../../model/risk";
import { colorRiskAssessment1, colorRiskAssessment2, colorRiskAssessment3, colorRiskAssessment4, colorRiskAssessment5 } from "../../style/colors";

const riskChances: GradeValue[] = [
    { value: 1, title: "Kan inte hända", color: colorRiskAssessment1 },
    { value: 2, title: "Kan troligen inte hända", color: colorRiskAssessment2 },
    { value: 3, title: "Kan hända", color: colorRiskAssessment3 },
    { value: 4, title: "Kommer troligen hända", color: colorRiskAssessment4 },
    { value: 5, title: "Kommer hända", color: colorRiskAssessment5 }
]

const riskImpacts: GradeValue[] = [
    { value: 1, title: "Ingen skada", color: colorRiskAssessment1 },
    { value: 2, title: "Liten skada", color: colorRiskAssessment2 },
    { value: 3, title: "Medel skada", color: colorRiskAssessment3 },
    { value: 4, title: "Stor skada", color: colorRiskAssessment4 },
    { value: 5, title: "Enorm skada", color: colorRiskAssessment5 }
]

export default function RiskAssessmentGrading({
    risk,
    riskAssessment,
    compact,
    onRiskAssessmentChange,
}: {
    risk?: Risk | undefined,
    riskAssessment?: CustomerOrderRiskAssessment | undefined,
    compact?: boolean  | undefined,
    onRiskAssessmentChange: (riskAssessment: CustomerOrderRiskAssessment) => void,
}) {
    const handleChanceChange = (value: number) => {
        const newRiskAssessment: CustomerOrderRiskAssessment = {
            id: riskAssessment?.id,
            riskTitle: risk?.title ?? riskAssessment!.riskTitle,
            riskDescription: risk?.description ?? riskAssessment?.riskDescription,
            riskCategoryId: risk?.riskCategoryId ?? riskAssessment!.riskCategoryId,
            riskCategoryName: risk?.riskCategoryName ?? riskAssessment!.riskCategoryName,
            chance: value,
            impact: riskAssessment?.impact,
            isSkipped: false
        }
        onRiskAssessmentChange(newRiskAssessment)
    }

    const handleImpactChange = (value: number) => {
        const newRiskAssessment: CustomerOrderRiskAssessment = {
            id: riskAssessment?.id,
            riskTitle: risk?.title ?? riskAssessment!.riskTitle,
            riskDescription: risk?.description ?? riskAssessment?.riskDescription,
            riskCategoryId: risk?.riskCategoryId ?? riskAssessment!.riskCategoryId,
            riskCategoryName: risk?.riskCategoryName ?? riskAssessment!.riskCategoryName,
            chance: riskAssessment?.chance,
            impact: value,
            isSkipped: false
        }
        onRiskAssessmentChange(newRiskAssessment)
    }

    return (
        <div className={styles.gradeSelectorWrapper}>
            <div className={(compact === true ? styles.gradingCompact : styles.grading)}>
                <GradeSelector
                    selectTitle={'Hur troligt är att detta händer?'}
                    selectedValue={riskAssessment?.chance}
                    onGradingChange={(value) => handleChanceChange(value)}
                    values={riskChances}
                />
            </div>
            <div className={(compact === true ? styles.gradingCompact : styles.grading)}>
                <GradeSelector
                    selectTitle={'Vilken skada innebär det?'}
                    selectedValue={riskAssessment?.impact}
                    onGradingChange={(value) => handleImpactChange(value)}
                    values={riskImpacts}
                />
            </div>
        </div>
    );
}