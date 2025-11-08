"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useSession } from "../store/useSession";
import { Loader } from "./loader";
import { innaccessibleByUsers, restrictedRoutes } from "../constants";

// authorized authenticated users
// unauthenticated users should not access protected routes
// protect all routes: no unauthenticated user should access the app manually
// ensure all authenticated users has free access
// no authenticated user should be visiting the signin, signup, verification,
//forgot password, reset password, change email, request verification mail etc auth
// pages.
// authenticated users should  access auth pages
// except the signin page when user's session has expired
// only auth users should access the protected or secured pages

export const Protect = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const router = useRouter();
  const queryParams = useSearchParams();
  const { user, loading } = useSession((state) => state);
  const { getSession } = useSession((state) => state.actions);

  useEffect(() => {
    getSession(true);
  }, []);

  if (loading && !path) return <Loader />;

  const redirect = (route: string, message?: string) => {
    if (message) {
      toast.error(message, {
        duration: 1000,
      });
    }

    if (typeof window?.location !== undefined) {
      setTimeout(() => {
        router.push(route);
      }, 500);
    }
  };

  const isNotAccessibleByAuthUsers = innaccessibleByUsers.includes(path);

  if (isNotAccessibleByAuthUsers && user) {
    void redirect("/feeds", "Please signin");
    return <Loader />;
  }

  if (!isNotAccessibleByAuthUsers && !user) {
    void redirect("/signin");
    return <Loader />;
  }

  if (restrictedRoutes.includes(path)) {
    const isAuthenticated = queryParams.get("authenticated");

    if (!isAuthenticated) {
      void redirect("/signin", "Please signin ");
      return <Loader />;
    }
  }

  return children;
};
