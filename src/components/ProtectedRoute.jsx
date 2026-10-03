import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

/** Full-screen session check shown while the backend validates the cookie. */
export function AuthLoading({ label = "Checking your session..." }) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex min-h-screen flex-col items-center justify-center gap-3 bg-page text-ink"
        >
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
            <p className="text-[13px] text-muted">{label}</p>
        </div>
    );
}

/** Guards authenticated areas (dashboard + app shell). */
export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <AuthLoading />;

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: `${location.pathname}${location.search}` }}
            />
        );
    }

    return <Outlet />;
}

/** Keeps authenticated users off the login page. */
export function GuestOnlyRoute() {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <AuthLoading />;

    if (isAuthenticated) {
        const from = location.state?.from;
        const safeFrom = from && !from.startsWith("/login") ? from : "/dashboard";
        return <Navigate to={safeFrom} replace />;
    }

    return <Outlet />;
}
