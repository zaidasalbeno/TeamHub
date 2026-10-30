import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "teamhub-users";
const USER_KEY = "teamhub-user";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem(USER_KEY) || "null");
      return savedUser?.role === "employer" || savedUser?.role === "employee"
        ? savedUser
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login: (email, role) => {
        const normalizedEmail = email.trim().toLowerCase();
        const found = readUsers().find(
          (item) => item.email.toLowerCase() === normalizedEmail,
        );
        const nextUser = found
          ? { name: found.name, email: found.email, role: found.role }
          : {
              name: role === "employer" ? "Alex Morgan" : "Jordan Lee",
              email: normalizedEmail,
              role,
            };
        setUser(nextUser);
        return nextUser;
      },
      register: (name, email, role) => {
        const saved = readUsers();
        const normalizedEmail = email.trim().toLowerCase();
        const alreadyRegistered = saved.some(
          (item) => item.email.toLowerCase() === normalizedEmail,
        );

        if (alreadyRegistered) {
          throw new Error("An account with this email already exists.");
        }

        const next = { name: name.trim(), email: normalizedEmail, role };
        localStorage.setItem(
          USERS_KEY,
          JSON.stringify([...saved, next]),
        );
        setUser(next);
        return next;
      },
      logout: () => setUser(null),
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
