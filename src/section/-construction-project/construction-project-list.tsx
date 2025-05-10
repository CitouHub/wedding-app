import { useEffect, useState } from "react";
import { getConstructionProjects } from "../service/construction-project-service";
import ViewLoader from "../../component/view-loader/view-loader";
import { ConstructionProject } from "../model/construction-project";
import styles from './style/construction-project.module.css';
import ConstructionProjectCard from "./componentes/-construction-project-card/construction-project-card";
import ConstructionProjectConfirm from "./-construction-project-confirm/construction-project-confirm";

const PROJECTS_PER_ROW = 2

export default function ConstructionProjectList() {
    const [loading, setLoading] = useState(true);
    const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[][]>([]);
    const [selectedConstructionProject, setSelectedConstructionProject] = useState<ConstructionProject | undefined>();

    useEffect(() => {
        setLoading(true);
        getConstructionProjects().then(result => {
            const constructionProjectMatrix = [] as ConstructionProject[][]
            let constructionProjectRow = [] as ConstructionProject[]
            let rowProjects = 0;
            
            result.forEach(project => {
                constructionProjectRow.push(project);
                rowProjects++;

                if (rowProjects == PROJECTS_PER_ROW) {
                    constructionProjectMatrix.push(constructionProjectRow);
                    constructionProjectRow = [];
                    rowProjects = 0;
                }
            });

            if (constructionProjectRow.length > 0) {
                constructionProjectMatrix.push(constructionProjectRow);
            }

            setConstructionProjects(constructionProjectMatrix);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <ViewLoader loading={loading} />
            {loading === false && selectedConstructionProject === undefined && <div className={styles.projectWrapper}>
                <h2>Välj projekt</h2>
                {constructionProjects.map(projectRow => {
                    return <div className={styles.projectRow} key={projectRow.map(_ => _.id).join(':')}>
                        {projectRow.map(project => {
                            return <ConstructionProjectCard
                                key={project.id}
                                constructionProject={project}
                                setSelectedConstructionProject={setSelectedConstructionProject}
                            />
                        })}
                    </div>
                })}
            </div>}
            {loading === false && selectedConstructionProject !== undefined && <div>
                <ConstructionProjectConfirm
                    constructionProject={selectedConstructionProject}
                    onGoBack={() => setSelectedConstructionProject(undefined)}
                />
            </div>}
        </>
    );
}
