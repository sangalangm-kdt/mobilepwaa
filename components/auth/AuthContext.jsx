// src/components/auth/AuthContext.js
import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setAuthState } from "../../features/auth/authSlice"; //integrating to the backend is in this path(i use axios)
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;
        if (payload.exp > currentTime) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          dispatch(setAuthState(true));
        } else {
          localStorage.removeItem("token");
          dispatch(setAuthState(false)); // Automatically log out the user
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        dispatch(setAuthState(false)); // Automatically log out the user
      }
    }
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
