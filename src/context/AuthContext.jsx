// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../utils/firebase';  // import from firebase.js
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign-in error:', err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
