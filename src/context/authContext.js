import { createContext } from "react";

/** Shared authentication context - kept separate so files stay refresh-friendly. */
export const AuthContext = createContext(null);
