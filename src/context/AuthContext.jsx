import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext.js";
import {
    getCurrentUser,
    googleSignIn,
    loginUser,
    logoutUser,
    registerUser,
} from "../services/authService.js";

/**
 * Single source of truth for authentication state across the app.
 * The session lives in an HttpOnly cookie - on load we ask the backend who we are.
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // initial session check

    useEffect(() => {
        let active = true;

        getCurrentUser()
            .then((data) => {
                if (active) setUser(data.authenticated ? data.user : null);
            })
            .catch(() => {
                if (active) setUser(null);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const login = useCallback(async (credentials) => {
        const data = await loginUser(credentials);
        setUser(data.user);
        return data;
    }, []);

    const register = useCallback(async (payload) => {
        const data = await registerUser(payload);
        setUser(data.user);
        return data;
    }, []);

    const signInWithGoogle = useCallback(async (credential) => {
        const data = await googleSignIn(credential);
        setUser(data.user);
        return data;
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null); // always drop local state, even if the request failed
        }
    }, []);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            loading,
            login,
            register,
            signInWithGoogle,
            logout,
        }),
        [user, loading, login, register, signInWithGoogle, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
