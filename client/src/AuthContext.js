import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(function isUserLoggedIn() {
    async function fetchData() {
      const token = localStorage.getItem('auth-app');
      fetch('/api/v1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }).then(async (response) => {
        const data = await response.json();
        if (data.isLoggedIn === true) {
          setIsLoggedIn(true);
          setCurrentUser(data.user);
        }
      });
    }
    fetchData();
  }, []);

  const defaultContext = {
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={defaultContext}>
      {children}
    </AuthContext.Provider>
  );
};
