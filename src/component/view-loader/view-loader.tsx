import styles from './style/view-loader.module.css';
import { CircularProgress } from "@mui/material";

export default function ViewLoader({ loading }: { loading: boolean }) {

    return (
        <>
            {loading === true && <div className={styles.loading} >
                <div>
                    <CircularProgress style={{ color: 'var(--color-primary)' }} />
                </div>
            </div>}
        </>
    )
}