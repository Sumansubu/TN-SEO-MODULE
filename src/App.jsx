import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import CompetitorAnalysis from "./pages/CompetitorAnalysis.jsx";
import OnPageSeo from "./pages/OnPageSeo.jsx";
import Upgrade from "./pages/Upgrade.jsx";
import LandingPage from "./pages/Landing.jsx";

import ContentAIWriter from "./pages/ContentAIWriter.jsx";
import ArticleGenerator from "./components/ContentWriter/ArticleGenerator.jsx";
import MetaTitleGenerator from "./components/ContentWriter/MetaTitleGenerator.jsx";
import FAQGenerator from "./components/ContentWriter/FAQGenerator.jsx";

import TechnicalSEO from "./pages/TechnicalSEO.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Existing pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/on-page-seo" element={<OnPageSeo />} />
        <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
        <Route path="/upgrade" element={<Upgrade />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* Content / AI Writer */}
        <Route path="/content" element={<ContentAIWriter />} />
        <Route
          path="/content/article-generator"
          element={<ArticleGenerator />}
        />
        <Route
          path="/content/meta-title-generator"
          element={<MetaTitleGenerator />}
        />
        <Route path="/content/faq-generator" element={<FAQGenerator />} />

        {/* Technical SEO */}
        <Route path="/technical-seo" element={<TechnicalSEO />} />
      </Route>

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
