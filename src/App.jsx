import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import CompetitorAnalysis from "./pages/CompetitorAnalysis.jsx";
import OnPageSeo from "./pages/OnPageSeo.jsx";
import Upgrade from "./pages/Upgrade.jsx";

// Backlink Analysis
import BacklinksFinder from "./components/BacklinkAnalysis/Backlinksfinder.jsx";
import BacklinkMonitoring from "./components/BacklinkAnalysis/Backlinkmonitoring.jsx";
import BacklinkOpportunities from "./components/BacklinkAnalysis/Backlinkopportunities.jsx";
import CompetitorBacklinks from "./components/BacklinkAnalysis/Competitiorbacklinks.jsx";
import AnchorTextAnalysis from "./components/BacklinkAnalysis/Anchortextanalysis.jsx";
import LinkGapAnalysis from "./components/BacklinkAnalysis/Linkgapanalysis.jsx";

// Rank Tracking
import RankTracking from "./components/RankTracking/RankTracking.jsx";
import KeywordRankings from "./components/RankTracking/Keywordrankings.jsx";
import SerpFeatures from "./components/RankTracking/Serpfeatures.jsx";
import CompetitorTracking from "./components/RankTracking/CompetitorTracking.jsx";
import LocationDevices from "./components/RankTracking/Locationdevices.jsx";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>

                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* On Page SEO */}
                <Route path="/on-page-seo" element={<OnPageSeo />} />

                {/* Competitor Analysis */}
                <Route
                    path="/competitor-analysis"
                    element={<CompetitorAnalysis />}
                />

                {/* ==============================
                    BACKLINK ANALYSIS
                =============================== */}

                <Route
                    path="/backlinks"
                    element={<BacklinksFinder />}
                />

                <Route
                    path="/backlinks/monitoring"
                    element={<BacklinkMonitoring />}
                />

                <Route
                    path="/backlinks/competitors"
                    element={<CompetitorBacklinks />}
                />

                <Route
                    path="/backlinks/opportunities"
                    element={<BacklinkOpportunities />}
                />

                <Route
                    path="/backlinks/anchor-text"
                    element={<AnchorTextAnalysis />}
                />

                <Route
                    path="/backlinks/link-gap"
                    element={<LinkGapAnalysis />}
                />

                {/* ==============================
                    RANK TRACKING
                =============================== */}

                <Route
                    path="/rank-tracking"
                    element={<RankTracking />}
                />

                <Route
                    path="/rank-tracking/keyword-rankings"
                    element={<KeywordRankings />}
                />

                <Route
                    path="/rank-tracking/serp-features"
                    element={<SerpFeatures />}
                />

                <Route
                    path="/rank-tracking/competitor-tracking"
                    element={<CompetitorTracking />}
                />

                <Route
                    path="/rank-tracking/location-devices"
                    element={<LocationDevices />}
                />

                {/* Upgrade */}
                <Route
                    path="/upgrade"
                    element={<Upgrade />}
                />

            </Route>

            {/* Invalid URL → Dashboard */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}