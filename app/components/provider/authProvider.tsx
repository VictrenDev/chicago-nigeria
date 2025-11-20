"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Protect } from "../protect";
import { useSession } from "@/app/store/useSession";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const { getSession } = useSession((state) => state.actions);

  const openPaths = ["/"];
  const isOpenPath = openPaths.includes(path);

  useEffect(() => {
    getSession(true);
  }, [getSession]);

  console.log(" <====  Auth provider ===> ");

  return isOpenPath ? children : <Protect>{children}</Protect>;
};

export default AuthProvider;
