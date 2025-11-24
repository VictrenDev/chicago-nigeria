"use client";

import React, { ReactNode, Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Protect } from "../protect";
import { useSession } from "@/app/store/useSession";
import { Loader } from "../loader";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const { getSession } = useSession((state) => state.actions);

  const openPaths = ["/subscription"];
  const isOpenPath = openPaths.includes(path);

  useEffect(() => {
    getSession(true);
  }, [getSession]);

  console.log(" <====  Auth provider ===> ");

  return (
    <Suspense fallback={<Loader className="h-full w-full" />}>
      {isOpenPath ? children : <Protect>{children}</Protect>}
    </Suspense>
  );
};

export default AuthProvider;
