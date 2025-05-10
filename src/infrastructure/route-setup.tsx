import HomeIcon from '@mui/icons-material/Home';
import ConstructionIcon from '@mui/icons-material/Construction';
import {
    ROUTE_PATH_WELCOME,
    ROUTE_PATH_TRACK
} from "./route";
import { RouteCategory } from './route-category';
import Track from '../track';

export const ROUTE_CATEGORY_WELCOME_TITLE = "Start";
export const ROUTE_CATEGORY_TRACK_TITLE = "Gissa låten";

export const ROUTE_SETUP: RouteCategory[] = [
    {
        title: ROUTE_CATEGORY_WELCOME_TITLE,
        routes: [
            {
                name: "Start - Välkommen",
                path: ROUTE_PATH_WELCOME,
                icon: <HomeIcon />,
                component: <Track />
            }
        ]
    },
    {
        title: ROUTE_CATEGORY_TRACK_TITLE,
        routes: [
            {
                name: ROUTE_CATEGORY_TRACK_TITLE,
                path: ROUTE_PATH_TRACK,
                icon: <ConstructionIcon />,
                component: <Track />
            }
        ]
    }
]