// components/AuthProvider.tsx
"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Loader } from "../loader";
import { Protect } from "../protect";
import { useSessionState } from "@/app/store/useSession";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const { getSession } = useSessionState((state) => state.actions);
  const { user, loading, hasCheckedAuth } = useSessionState((state) => ({
    user: state.user,
    loading: state.loading,
    hasCheckedAuth: state.hasCheckedAuth
  }));
  
  const hasInitialized = useRef(false);

  const openPaths = ["/", "/about", "/signin", "/signup", "/forgot-password"];
  const isOpenPath = openPaths.includes(path);

  useEffect(() => {
    // Prevent double initialization
    if (!hasInitialized.current && !hasCheckedAuth) {
      hasInitialized.current = true;
      getSession(true);
    }
  }, [getSession, hasCheckedAuth]);

  // Show loader during initial auth check for protected routes
  if ((loading || !hasCheckedAuth) && !isOpenPath) {
    return <Loader />;
  }

  return isOpenPath ? children : <Protect>{children}</Protect>;
};

export default AuthProvider;