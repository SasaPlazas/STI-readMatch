import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function boot() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    }
    boot();
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession ?? null);
      },
    );
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const user = useMemo(() => {
    if (!session?.user) return null;
    const email = session.user.email || "";
    const name =
      session.user.user_metadata?.name || email.split("@")[0] || "Reader";
    const completedOnboarding = Boolean(
      session.user.user_metadata?.completedOnboarding ??
      session.user.user_metadata?.completed_onboarding ??
      false,
    );
    return { id: session.user.id, email, name, completedOnboarding };
  }, [session?.user]);

  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const completedOnboarding = Boolean(
      data?.user?.user_metadata?.completedOnboarding ??
      data?.user?.user_metadata?.completed_onboarding ??
      false,
    );
    return { completedOnboarding };
  }

  async function signUp({ email, password, name }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, completedOnboarding: false } },
    });
    if (error) {
      if (error.message?.toLowerCase().includes("rate limit")) {
        throw new Error(
          "Se ha alcanzado el límite de envíos de correo en Supabase. Revisa la configuración de confirmación de email o espera unos minutos.",
        );
      }
      throw error;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    if (!sessionData?.session) {
      return { needsEmailConfirmation: true };
    }
    return { completedOnboarding: false };
  }

  async function completeOnboarding() {
    if (!session?.user?.id) {
      throw new Error("No active session found. Please sign in again.");
    }
    const { data: updated, error } = await supabase.auth.updateUser({
      data: { completedOnboarding: true },
    });
    if (error) throw error;
    if (updated?.user && session) {
      setSession({ ...session, user: updated.user });
      return;
    }
    const { data } = await supabase.auth.getSession();
    setSession(data.session ?? null);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, completeOnboarding, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
