/**
 * Centralized authentication API client.
 * Every request uses cookies (`credentials: "include"`) - tokens never touch JS.
 */

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");

export class ApiError extends Error {
    constructor(message, status = 0) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

async function request(path, { method = "GET", body } = {}) {
    let response;

    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            credentials: "include",
            headers: body ? { "Content-Type": "application/json" } : undefined,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError("Unable to connect to the server. Please make sure the backend is running.", 0);
    }

    let data = {};
    try {
        data = await response.json();
    } catch {
        // non-JSON body (e.g. empty) - handled through response.ok below
    }

    if (!response.ok) {
        throw new ApiError(
            data?.message || data?.error || "Something went wrong. Please try again.",
            response.status
        );
    }

    return data;
}

export function registerUser({ fullName, email, password, confirmPassword }) {
    return request("/auth/register", { method: "POST", body: { fullName, email, password, confirmPassword } });
}

export function loginUser({ email, password, rememberMe = true }) {
    return request("/auth/login", { method: "POST", body: { email, password, rememberMe } });
}

export function logoutUser() {
    return request("/auth/logout", { method: "POST" });
}

export function getCurrentUser() {
    return request("/auth/me");
}

export function getGoogleConfig() {
    return request("/auth/google/config");
}

export function googleSignIn(credential) {
    return request("/auth/google", { method: "POST", body: { credential } });
}

export function forgotPassword(email) {
    return request("/auth/forgot-password", { method: "POST", body: { email } });
}

export function resetPassword({ token, password, confirmPassword }) {
    return request("/auth/reset-password", {
        method: "POST",
        body: { token, password, confirmPassword },
    });
}
