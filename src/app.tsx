import { Routes, Route } from 'react-router-dom'
import './app.css'
import Layout from './layout'
import { ROUTE_SETUP } from './infrastructure/route-setup'

export default function App() {

    const noRoute = () => {
        return <p>404 NOT FOUND</p>
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {ROUTE_SETUP.map(c => {
                    return c.routes.map(r => {
                        return <Route
                            key={r.path}
                            path={r.path}
                            element={r.component}
                        />
                    })
                })}
                <Route path="*" element={noRoute()} />
            </Route>
        </Routes>
    )
}