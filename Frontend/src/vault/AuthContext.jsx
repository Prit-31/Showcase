import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// ── Credentials are read from env variables (.env file)
// VITE_VAULT_USER=yourUsername
// VITE_VAULT_PASS=yourPassword
// If env vars not set, falls back to defaults below (change these!)
const VALID_USER = import.meta.env.VITE_VAULT_USER || "prit";
const VALID_PASS = import.meta.env.VITE_VAULT_PASS || "kali@31";

const SESSION_KEY = "__vault_session__";

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw === "1";
    } catch {
      return false;
    }
  });

  const login = (user, pass) => {
    if (user === VALID_USER && pass === VALID_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ authed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}