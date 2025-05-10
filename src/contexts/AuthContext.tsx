
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'admin' | 'user' | 'guest';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role?: UserRole) => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  userRole: 'guest',
  login: () => {},
  logout: () => {}
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [userRole, setUserRole] = useState<UserRole>(
    (localStorage.getItem('userRole') as UserRole) || 'guest'
  );

  const login = (role: UserRole = 'user') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
