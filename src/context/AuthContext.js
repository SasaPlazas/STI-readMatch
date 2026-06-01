import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signIn({ email, name = 'Maya' }) {
    setUser({ email, name, completedOnboarding: true });
  }

  function signUp({ email, name }) {
    // After sign up, user still needs onboarding
    setUser({ email, name, completedOnboarding: false });
  }

  function completeOnboarding() {
    setUser((prev) => prev ? { ...prev, completedOnboarding: true } : prev);
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, completeOnboarding, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
