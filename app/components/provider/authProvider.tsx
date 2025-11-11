"use client";

import React, { ReactNode, Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";

import { Loader } from "../loader";
import { Protect } from "../protect";
import { useSession } from "@/app/store/useSession";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const path: string = usePathname();

  const { getSession } = useSession((state) => state.actions);
  const openPaths = ["/", "/about"];

  const isOpenPath = openPaths.includes(path);

  useEffect(() => {
    getSession(true);

    console.log("Get session initialized!");
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {isOpenPath ? children : <Protect>{children}</Protect>}
    </Suspense>
  );
};

export default AuthProvider;
