import frameStyles from "./style/frame.module.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH_WELCOME } from "../../infrastructure/route";

export default function Top() {
    const navigate = useNavigate();

    return (
        <div className={[frameStyles.top, frameStyles.topBannerImage1].join(' ')} >
            <div className={frameStyles.centerContent}>
                <div>
                    <img className={frameStyles.logo} src={logo} alt='Riskbedömning logo' onClick={() => navigate(ROUTE_PATH_WELCOME)} style={{ cursor: 'pointer' }} />
                    <div className={frameStyles.title} onClick={() => navigate(ROUTE_PATH_WELCOME)} style={{ cursor: 'pointer' }}>
                        <i>Riskbedömning</i>
                    </div>
                </div>
            </div>
        </div>
    );
}
