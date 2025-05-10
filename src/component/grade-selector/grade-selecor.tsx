import { Radio } from "@mui/material";
import { GradeValue } from "./model/grade-value";
import styles from './style/grade-selector.module.css';

export default function GradeSelector({
    selectTitle,
    selectedValue,
    onGradingChange,
    values
}: {
    selectTitle: string,
    selectedValue?: number | undefined,
    onGradingChange: (value: number) => void,
    values: GradeValue[]
}) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onGradingChange(Number(event.target.value));
    };

    const controlProps = (item: number) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item
    });

    return (
        <>
            <span>{selectTitle}<br /><b>{values.find(_ => _.value === selectedValue)?.title ?? '\u00A0'}</b></span>
            <div className={styles.gradingValues} >
                {values.map(_ => {
                    return <Radio key={_.value} {...controlProps(_.value)}
                        sx={{
                            color: _.color,
                            '&.Mui-checked': {
                                color: _.color
                            },
                            '& .MuiSvgIcon-root': {
                                fontSize: '2rem',
                            },
                        }}
                    />
                })}
            </div>
        </>
    );
}
