import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkAuthentication = useCallback(async () => {
    try {
      const user = await axios.get("/api/user/check-auth");
      setUser(user.data.data);
      setIsSeller(user.data.data.isSeller);
      setSeller(user.data.data.sellers?.seller_name);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        seller,
        isSeller,
        loading,
        setIsSeller,
        setSeller,
        setUser,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
