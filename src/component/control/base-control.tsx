import { LoadingButton } from "@mui/lab";
import styles from './style/risk-assessment-control.module.css';

export default function BaseControl({
    leftButtonActive,
    leftButtonText,
    leftButtonIcon,
    leftButtonDisable,
    leftButtonLoading,
    onLeftButtonClick,

    middleButtonActive,
    middleButtonText,
    middleButtonIcon,
    middleButtonDisable,
    middleButtonLoading,
    onMiddleButtonClick,

    rightButtonActive,
    rightButtonText,
    rightButtonIcon,
    rightButtonDisable,
    rightButtonLoading,
    onRightButtonClick,
}: {
    leftButtonActive?: boolean | undefined,
    leftButtonText?: string | undefined,
    leftButtonIcon?: JSX.Element | undefined,
    leftButtonDisable?: boolean | undefined,
    leftButtonLoading?: boolean | undefined,
    onLeftButtonClick?: () => void | undefined,

    middleButtonActive?: boolean | undefined,
    middleButtonText?: string | undefined,
    middleButtonIcon?: JSX.Element | undefined,
    middleButtonDisable?: boolean | undefined,
    middleButtonLoading?: boolean | undefined,
    onMiddleButtonClick?: () => void | undefined,

    rightButtonActive?: boolean | undefined,
    rightButtonText?: string | undefined,
    rightButtonIcon?: JSX.Element | undefined,
    rightButtonDisable?: boolean | undefined,
    rightButtonLoading?: boolean | undefined,
    onRightButtonClick?: () => void | undefined
}) {
    return (
        <div className={styles.buttonWrapper} >
            
            {leftButtonActive === true && <div className={styles.button}>
                <LoadingButton
                    className={styles.button}
                    id={`left-button`}
                    startIcon={leftButtonIcon}
                    variant="outlined"
                    disabled={leftButtonDisable ?? false}
                    loading={leftButtonLoading ?? false}
                    onClick={onLeftButtonClick}
                >
                    {leftButtonText ?? 'Tillbaka'}
                </LoadingButton>
            </div>}
            
            {middleButtonActive === true && <div className={styles.button}>
                <LoadingButton
                    className={styles.button}
                    id={`middle-button`}
                    startIcon={middleButtonIcon}
                    variant="outlined"
                    disabled={middleButtonDisable ?? false}
                    loading={middleButtonLoading ?? false}
                    onClick={onMiddleButtonClick}
                >
                    {middleButtonText ?? 'Mitten'}
                </LoadingButton>
            </div>}

            {rightButtonActive === true && <div className={styles.button}>
                <LoadingButton
                    className={styles.button}
                    id={`right-button`}
                    endIcon={rightButtonIcon}
                    variant="contained"
                    disabled={rightButtonDisable ?? false}
                    loading={rightButtonLoading ?? false}
                    onClick={onRightButtonClick}
                >
                    {rightButtonText ?? 'Nästa'}
                </LoadingButton>
            </div>}
        </div>
    );
}