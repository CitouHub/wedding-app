import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import {
    ROUTE_PATH_WELCOME,
    ROUTE_PATH_CONSTRUCTION_PROJECT,
    ROUTE_PATH_RISK_ASSESSMENT,
    ROUTE_PATH_CUSTOMER_ORDER,
    ROUTE_PATH_CUSTOMER_ORDER_ADD_RISK
} from "./route";
import { RouteCategory } from './route-category';
import Welcome from '../section/-welcome/welcome';
import ConstructionProjectList from '../section/-construction-project/construction-project-list';
import RiskAssessmentHandler from '../section/-risk-assessment/risk-assessment-handler';
import RiskAssessmentCustomHandler from '../section/-risk-assessment-add/risk-assessment-add-handler';
import CustomerOrderHandler from '../section/-customer-order/customer-order-handler';

export const ROUTE_CATEGORY_WELCOME_TITLE = "Start";
export const ROUTE_CATEGORY_CONSTRUCTION_PROJECT_TITLE = "Byggprojekt";
export const ROUTE_CATEGORY_RISK_ASSESSMENT_TITLE = "Riskbedömning";
export const ROUTE_CATEGORY_CUSTOMER_ORDER_TITLE = "Kundorder";
export const ROUTE_CATEGORY_CUSTOMER_ORDER_ADD_RISK_TITLE = "Lägg till egen risk";

export const ROUTE_SETUP: RouteCategory[] = [
    {
        title: ROUTE_CATEGORY_WELCOME_TITLE,
        routes: [
            {
                name: "Start - Välkommen",
                path: ROUTE_PATH_WELCOME,
                icon: <HomeIcon />,
                component: <Welcome />
            }
        ]
    },
    {
        title: ROUTE_CATEGORY_CONSTRUCTION_PROJECT_TITLE,
        routes: [
            {
                name: ROUTE_CATEGORY_CONSTRUCTION_PROJECT_TITLE,
                path: ROUTE_PATH_CONSTRUCTION_PROJECT,
                icon: <ConstructionIcon />,
                component: <ConstructionProjectList />
            }
        ]
    },
    {
        title: ROUTE_CATEGORY_RISK_ASSESSMENT_TITLE,
        routes: [
            {
                name: ROUTE_CATEGORY_RISK_ASSESSMENT_TITLE,
                path: ROUTE_PATH_RISK_ASSESSMENT,
                icon: <ConstructionIcon />,
                component: <RiskAssessmentHandler />
            }
        ]
    },
    {
        title: ROUTE_CATEGORY_CUSTOMER_ORDER_TITLE,
        routes: [
            {
                name: ROUTE_CATEGORY_CUSTOMER_ORDER_TITLE,
                path: ROUTE_PATH_CUSTOMER_ORDER,
                icon: <ConstructionIcon />,
                component: <CustomerOrderHandler />
            }
        ]
    },
    {
        title: ROUTE_CATEGORY_CUSTOMER_ORDER_ADD_RISK_TITLE,
        routes: [
            {
                name: ROUTE_CATEGORY_CUSTOMER_ORDER_ADD_RISK_TITLE,
                path: ROUTE_PATH_CUSTOMER_ORDER_ADD_RISK,
                icon: <ConstructionIcon />,
                component: <RiskAssessmentCustomHandler />
            }
        ]
    }
]