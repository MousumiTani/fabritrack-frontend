import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase/firebase.config";
import AuthContext from "./AuthContext";

const API = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch JWT & role from backend
  const fetchJwtAndRole = async (email) => {
    const res = await axios.post(`${API}/users/jwt`, { email });
    localStorage.setItem("access-token", res.data.token);
    localStorage.setItem("user-role", res.data.role);
    setRole(res.data.role);
  };

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          await fetchJwtAndRole(currentUser.email);
        } catch (err) {
          console.error("JWT error:", err);
        }
      } else {
        localStorage.removeItem("access-token");
        localStorage.removeItem("user-role");
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register new user
  const register = async (
    email,
    password,
    name,
    photoURL,
    role,
    managerCode,
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL });

    await axios.post(`${API}/users`, {
      name,
      email,
      role,
      managerCode,
    });

    await fetchJwtAndRole(email);
  };

  // Login
  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await fetchJwtAndRole(email);
    return res;
  };

  // Logout
  const logout = async () => {
    localStorage.clear();
    setRole(null);
    await signOut(auth);
  };

  const value = { user, role, loading, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
