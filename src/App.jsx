import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CompetitorAnalysis from "./pages/CompetitorAnalysis.jsx";
import OnPageSeo from "./pages/OnPageSeo.jsx";
import Upgrade from "./pages/Upgrade.jsx";
import LandingPage from "./pages/Landing.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/on-page-seo" element={<OnPageSeo />} />
                <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
                <Route path="/upgrade" element={<Upgrade />} />
                <Route path="/landing" element={<LandingPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
