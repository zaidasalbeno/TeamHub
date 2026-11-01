import { useEffect, useMemo, useState } from "react";
import AuthContext from "./authContext.js";
const USERS_KEY = "teamhub-users";
const USER_KEY = "teamhub-user";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])\S{8,}$/;

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Secure password storage is unavailable in this browser.");
  }
  const passwordSalt = salt || globalThis.crypto.getRandomValues(new Uint8Array(16));
  const bytes = new TextEncoder().encode(password);
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    bytes,
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const digest = await globalThis.crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: passwordSalt, iterations: 100000 },
    key,
    256,
  );
  return {
    salt: Array.from(passwordSalt, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join(""),
    hash: Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join(""),
  };
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/.{2}/g).map((pair) => parseInt(pair, 16)));
}

function validateCredentials(name, email, password, requireName = false) {
  if (!email || !password || (requireName && !name)) {
    throw new Error("Please complete all required fields.");
  }
  if (!EMAIL_PATTERN.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  if (requireName && !PASSWORD_PATTERN.test(password)) {
    throw new Error(
      "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and symbol.",
    );
  }
  if (requireName && !/\S/.test(name)) {
    throw new Error("Enter your name.");
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
      login: async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        validateCredentials("", normalizedEmail, password);
        const found = readUsers().find(
          (item) => item.email.toLowerCase() === normalizedEmail,
        );
        const candidate = found?.passwordHash && found?.passwordSalt
          ? await hashPassword(password, hexToBytes(found.passwordSalt))
          : null;
        if (!found || !candidate || found.passwordHash !== candidate.hash) {
          throw new Error("Email or password is incorrect.");
        }
        const nextUser = { name: found.name, email: found.email, role: found.role };
        setUser(nextUser);
        return nextUser;
      },
      register: async (name, email, password, role) => {
        const saved = readUsers();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();
        validateCredentials(normalizedName, normalizedEmail, password, true);
        if (role !== "employer" && role !== "employee") {
          throw new Error("Choose Employee or Employer for your account.");
        }
        const alreadyRegistered = saved.some(
          (item) => item.email.toLowerCase() === normalizedEmail,
        );

        if (alreadyRegistered) {
          throw new Error("An account with this email already exists.");
        }

        const passwordRecord = await hashPassword(password);
        const next = {
          name: normalizedName,
          email: normalizedEmail,
          passwordSalt: passwordRecord.salt,
          passwordHash: passwordRecord.hash,
          role,
        };
        localStorage.setItem(
          USERS_KEY,
          JSON.stringify([...saved, next]),
        );
        const signedInUser = {
          name: next.name,
          email: next.email,
          role: next.role,
        };
        setUser(signedInUser);
        return signedInUser;
      },
      logout: () => setUser(null),
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

