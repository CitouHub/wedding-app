import { Card, CardContent, Typography } from "@mui/material";
import styles from "./style/construction-project-card.module.css";
import { ConstructionProject } from "../../../model/construction-project";

export default function ConstructionProjectCard({
    constructionProject,
    setSelectedConstructionProject
}: {
    constructionProject: ConstructionProject,
    setSelectedConstructionProject?: React.Dispatch<React.SetStateAction<ConstructionProject | undefined>> | undefined,
}) {
    const style = {
        backgroundImage: `linear-gradient(315deg, transparent, white 60%), url('${constructionProject.imagePath}')`
    } as React.CSSProperties;

    const handleOnClick = () => {
        if (setSelectedConstructionProject !== undefined) {
            setSelectedConstructionProject(constructionProject)
        }
    }

    return (
        <Card
            style={style}
            className={styles.card}
            onClick={handleOnClick}
        >
            <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h5" component="div" className={styles.title} >
                    {constructionProject.title}
                </Typography>
            </CardContent>
        </Card>
    );
}
