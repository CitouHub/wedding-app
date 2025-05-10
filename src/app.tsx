import { Routes, Route, Outlet } from 'react-router-dom'
import './app.css'
import { ROUTE_SETUP } from './infrastructure/route-setup'

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                {ROUTE_SETUP.map(c => {
                    return c.routes.map(r => {
                        return <Route
                            key={r.path}
                            path={r.path}
                            element={r.component}
                        />
                    })
                })}
            </Route>
        </Routes>
    )
}