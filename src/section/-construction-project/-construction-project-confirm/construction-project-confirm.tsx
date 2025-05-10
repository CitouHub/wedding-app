import { PARAMETER_CONSTRUCTION_PROJECT_ID, ROUTE_PATH_RISK_ASSESSMENT } from "../../../infrastructure/route";
import { ConstructionProject } from "../../model/construction-project"
import ConstructionProjectCard from "../componentes/-construction-project-card/construction-project-card";
import styles from "./style/construction-project-confirm.module.css";
import { useNavigate } from "react-router-dom";
import BaseControl from "../../../component/control/base-control";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ConstructionProjectConfirm({
    constructionProject,
    onGoBack
}: {
    constructionProject: ConstructionProject
    onGoBack: () => void
}) {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.cardTitle} >
                <ConstructionProjectCard
                    constructionProject={constructionProject}
                />
            </div>
            <p>{constructionProject.description}</p>
            <br />
            <div>
                <BaseControl 
                    leftButtonActive={true}
                    leftButtonText={"Välj projekt"}
                    leftButtonIcon={<ArrowBackIcon />}
                    onLeftButtonClick={onGoBack}

                    rightButtonActive={true}
                    rightButtonText={"Börja"}
                    rightButtonIcon={<ArrowForwardIcon />}
                    onRightButtonClick={() => navigate(ROUTE_PATH_RISK_ASSESSMENT.replace(PARAMETER_CONSTRUCTION_PROJECT_ID, constructionProject.id.toString()))}
                />
            </div>
        </>
    );
}
