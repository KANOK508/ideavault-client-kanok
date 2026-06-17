"use client";
import {
  createContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import axiosPublic from "@/lib/axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("ideavault-theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("ideavault-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Register
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Update profile
  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google login
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  // Logout
  const logout = () => {
    localStorage.removeItem("ideavault-token");
    return signOut(auth);
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Get JWT token
        try {
          const res = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          localStorage.setItem("ideavault-token", res.data.token);
          // Save user to DB
          await axiosPublic.post("/users", {
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL,
          });
        } catch (err) {
          console.error("Token error:", err);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    theme,
    toggleTheme,
    register,
    updateUserProfile,
    login,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
