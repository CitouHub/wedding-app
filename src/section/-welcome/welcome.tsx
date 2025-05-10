import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH_CONSTRUCTION_PROJECT } from "../../infrastructure/route";

export default function Welcome() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Välkommen!</h2>
            <p>Med Riskbedömning så får du hjälp med just det, att bedöma alla risk det finns i ditt kommande projekt.</p>
            <p>Varför behöver jag göra en risk bedömning?<br />Detta är något som din kommun vill ha. De vill veta att du tänkt till kring riskerna som finns med det bygge som du planera. Vi hjälper både dig, och din kommun, bra va!?</p>
            <br />
            <br />
            <Button
                variant="contained"
                style={{ width: '150px'}}
                onClick={() => navigate(ROUTE_PATH_CONSTRUCTION_PROJECT)}
            >
                Välj projekt
            </Button>
        </div>
    );
}
