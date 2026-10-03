import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute, { GuestOnlyRoute } from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CompetitorAnalysis from "./pages/CompetitorAnalysis.jsx";
import OnPageSeo from "./pages/OnPageSeo.jsx";
import Upgrade from "./pages/Upgrade.jsx";
import LandingPage from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route element={<GuestOnlyRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* Authenticated app shell */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/on-page-seo" element={<OnPageSeo />} />
                    <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                    <Route path="/upgrade" element={<Upgrade />} />
                </Route>
            </Route>

            <Route path="/landing" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
