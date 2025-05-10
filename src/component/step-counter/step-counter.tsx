import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import stepCounterStyles from "./style/step-counter.module.css";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 30,
    borderRadius: 15,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 15,
        backgroundColor: 'var(--color-primary)',
        ...theme.applyStyles('dark', {
            backgroundColor: '#308fe8',
        }),
    },
}));

export default function StepCounter({
    steps,
    stepsComplete,
    text
}: {
    steps: number,
    stepsComplete: number,
    text: string
}) {
    return (
        <>
            <div className={stepCounterStyles.progressBar} >
                <BorderLinearProgress variant="determinate" value={stepsComplete == 0 ? 0 : (stepsComplete / steps) * 100} />
                <div className={stepCounterStyles.progressText} ><b>{text}</b></div>
            </div>
        </>
    );
}
