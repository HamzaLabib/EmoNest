import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  authenticated: false,
  setAuthenticated: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        await AsyncStorage.removeItem('userToken');
        const token = await AsyncStorage.getItem('userToken');
        setAuthenticated(!!token);
        setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
