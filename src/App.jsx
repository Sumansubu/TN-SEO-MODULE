import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import ProtectedRoute, { GuestOnlyRoute } from "./components/ProtectedRoute.jsx";

// ==============================
// Pages
// ==============================
import Dashboard from "./pages/Dashboard.jsx";
import CompetitorAnalysis from "./pages/CompetitorAnalysis.jsx";
import OnPageSeo from "./pages/OnPageSeo.jsx";
import Upgrade from "./pages/Upgrade.jsx";
import LandingPage from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";

// ==============================
// Integrated pages (added)
// Projects / SEO Reports / Settings
// ==============================
import Projects from "./pages/Projects.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

// ==============================
// Content / AI Writer
// ==============================
import ContentAIWriter from "./pages/ContentAIWriter.jsx";
import ArticleGenerator from "./components/ContentWriter/ArticleGenerator.jsx";
import MetaTitleGenerator from "./components/ContentWriter/MetaTitleGenerator.jsx";
import FAQGenerator from "./components/ContentWriter/FAQGenerator.jsx";

// ==============================
// Technical SEO
// ==============================
import TechnicalSEO from "./pages/TechnicalSEO.jsx";

// ==============================
// Backlink Analysis
// ==============================
import BacklinksFinder from "./components/BacklinkAnalysis/Backlinksfinder.jsx";
import BacklinkMonitoring from "./components/BacklinkAnalysis/Backlinkmonitoring.jsx";
import BacklinkOpportunities from "./components/BacklinkAnalysis/Backlinkopportunities.jsx";
import CompetitorBacklinks from "./components/BacklinkAnalysis/Competitiorbacklinks.jsx";
import AnchorTextAnalysis from "./components/BacklinkAnalysis/Anchortextanalysis.jsx";
import LinkGapAnalysis from "./components/BacklinkAnalysis/Linkgapanalysis.jsx";

// ==============================
// Rank Tracking
// ==============================
import RankTracking from "./components/RankTracking/RankTracking.jsx";
import KeywordRankings from "./components/RankTracking/Keywordrankings.jsx";
import SerpFeatures from "./components/RankTracking/Serpfeatures.jsx";
import CompetitorTracking from "./components/RankTracking/CompetitorTracking.jsx";
import LocationDevices from "./components/RankTracking/Locationdevices.jsx";

export default function App() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route element={<GuestOnlyRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* ==========================================
                AUTHENTICATED APP SHELL
            =========================================== */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>

                    {/* ==========================================
                        DASHBOARD
                    =========================================== */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/* ==========================================
                        ON PAGE SEO
                    =========================================== */}
                    <Route
                        path="/on-page-seo"
                        element={<OnPageSeo />}
                    />

                    {/* ==========================================
                        COMPETITOR ANALYSIS
                    =========================================== */}
                    <Route
                        path="/competitor-analysis"
                        element={<CompetitorAnalysis />}
                    />

                    {/* ==========================================
                        BACKLINK ANALYSIS
                    =========================================== */}

                    {/* Backlink Overview */}
                    <Route
                        path="/backlinks"
                        element={<BacklinksFinder />}
                    />

                    {/* Backlink Monitoring */}
                    <Route
                        path="/backlinks/monitoring"
                        element={<BacklinkMonitoring />}
                    />

                    {/* Competitor Backlinks */}
                    <Route
                        path="/backlinks/competitors"
                        element={<CompetitorBacklinks />}
                    />

                    {/* Backlink Opportunities */}
                    <Route
                        path="/backlinks/opportunities"
                        element={<BacklinkOpportunities />}
                    />

                    {/* Anchor Text Analysis */}
                    <Route
                        path="/backlinks/anchor-text"
                        element={<AnchorTextAnalysis />}
                    />

                    {/* Link Gap Analysis */}
                    <Route
                        path="/backlinks/link-gap"
                        element={<LinkGapAnalysis />}
                    />

                    {/* ==========================================
                        RANK TRACKING
                    =========================================== */}

                    {/* Rank Tracking Overview */}
                    <Route
                        path="/rank-tracking"
                        element={<RankTracking />}
                    />

                    {/* Keyword Rankings */}
                    <Route
                        path="/rank-tracking/keyword-rankings"
                        element={<KeywordRankings />}
                    />

                    {/* SERP Features */}
                    <Route
                        path="/rank-tracking/serp-features"
                        element={<SerpFeatures />}
                    />

                    {/* Competitor Tracking */}
                    <Route
                        path="/rank-tracking/competitor-tracking"
                        element={<CompetitorTracking />}
                    />

                    {/* Location & Devices */}
                    <Route
                        path="/rank-tracking/location-devices"
                        element={<LocationDevices />}
                    />

                    {/* ==========================================
                        CONTENT / AI WRITER
                    =========================================== */}

                    {/* Content AI Writer */}
                    <Route
                        path="/content"
                        element={<ContentAIWriter />}
                    />

                    {/* Article Generator */}
                    <Route
                        path="/content/article-generator"
                        element={<ArticleGenerator />}
                    />

                    {/* Meta Title Generator */}
                    <Route
                        path="/content/meta-title-generator"
                        element={<MetaTitleGenerator />}
                    />

                    {/* FAQ Generator */}
                    <Route
                        path="/content/faq-generator"
                        element={<FAQGenerator />}
                    />

                    {/* ==========================================
                        TECHNICAL SEO
                    =========================================== */}
                    <Route
                        path="/technical-seo"
                        element={<TechnicalSEO />}
                    />

                    {/* ==========================================
                        UPGRADE
                    =========================================== */}
                    <Route
                        path="/upgrade"
                        element={<Upgrade />}
                    />

                </Route>
            </Route>

            {/* ==========================================
                INTEGRATED: PROJECTS / REPORTS / SETTINGS
            =========================================== */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="/landing" element={<Navigate to="/" replace />} />

            {/* ==========================================
                UNKNOWN URL → LANDING PAGE
            =========================================== */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}
