// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? storedUser : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  console.log('token',token)


  const login = (userData) => {
    setUser(userData?.user?.mongoUser);
    localStorage.setItem("user", JSON.stringify(userData?.user?.mongoUser));
    setToken(userData?.token);
    localStorage.setItem("token", userData?.token);
    // localStorage.setItem("userId",userData?.user?.mongoUser?._id)
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
