// src/component/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On page reload, get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/v1/signin",
    credentials,
    {
      headers: {
        Authorization: undefined // 👈 Ensure no token is sent
      },
    }
  );

  const userData = response.data;
  localStorage.setItem("token", userData.jwt);
  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);

  // Now check/create cart as before
  try {
    const cartRes = await axios.get("http://localhost:8080/api/cart", {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    });

    if (!cartRes.data) {
      await axios.post("http://localhost:8080/api/cart/create", null, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });
    }
  } catch (err) {
    if (err.response?.status === 404) {
      await axios.post("http://localhost:8080/api/cart/create", null, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });
    } else {
      console.error("Error checking/creating cart:", err.message);
    }
  }
};



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
