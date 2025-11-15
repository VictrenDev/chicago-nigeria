// components/Protect.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSessionState } from "../store/useSession";
import { Loader } from "./loader";
import { innaccessibleByUsers, restrictedRoutes } from "../constants";

export const Protect = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const queryParams = useSearchParams();
  const { user, loading, hasCheckedAuth } = useSessionState((state) => ({
    user: state.user,
    loading: state.loading,
    hasCheckedAuth: state.hasCheckedAuth
  }));
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Debug current auth state
  console.log("🛡️ Protect Component Debug:");
  console.log("- path:", path);
  console.log("- user:", user);
  console.log("- user has _id?", user?._id);
  console.log("- loading:", loading);
  console.log("- hasCheckedAuth:", hasCheckedAuth);
  console.log("- isRedirecting:", isRedirecting);

  useEffect(() => {
    setIsRedirecting(false);
  }, [path]);

  const redirect = (route: string, message?: string) => {
    if (isRedirecting) return;
    
    setIsRedirecting(true);
    
    if (message) {
      toast.error(message, { duration: 1000 });
    }

    setTimeout(() => {
      router.push(route);
    }, 500);
  };

  // Show loader while checking auth status
  if (loading && !hasCheckedAuth) {
    console.log("🛡️ Showing loader - initial auth check");
    return <Loader />;
  }

  // Prevent flash by checking if we've completed auth check
  if (!hasCheckedAuth) {
    console.log("🛡️ Showing loader - auth check not completed");
    return <Loader />;
  }

  const isNotAccessibleByAuthUsers = innaccessibleByUsers.includes(path);

  // FIXED: Check if user exists and has _id (basic authentication)
  const isAuthenticated = !!(user && user._id);
  
  console.log("🛡️ Auth Check Results:");
  console.log("- isAuthenticated:", isAuthenticated);
  console.log("- isNotAccessibleByAuthUsers:", isNotAccessibleByAuthUsers);
  console.log("- current path:", path);

  // Auth user trying to access auth pages (like signin)
  if (isNotAccessibleByAuthUsers && isAuthenticated) {
    console.log("🛡️ Redirecting: Authenticated user trying to access auth page");
    if (!isRedirecting) {
      redirect("/feeds", "You cannot access this page!");
    }
    return <Loader />;
  }

  // Unauthenticated user trying to access protected pages
  if (!isNotAccessibleByAuthUsers && !isAuthenticated) {
    console.log("🛡️ Redirecting: Unauthenticated user trying to access protected page");
    if (!isRedirecting) {
      redirect("/signin", "Please sign in to access this page");
    }
    return <Loader />;
  }

  // Handle restricted routes
  if (restrictedRoutes.includes(path)) {
    const isAuthenticatedParam = queryParams.get("authenticated");
    if (!isAuthenticatedParam && !isAuthenticated) {
      console.log("🛡️ Redirecting: Restricted route without authentication");
      if (!isRedirecting) {
        redirect("/signin", "Please sign in to access this page");
      }
      return <Loader />;
    }
  }

  console.log("🛡️ Access granted to:", path);
  return children;
};