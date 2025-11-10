"use client";

import React, { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";

import { Loader } from "../loader";
import { Protect } from "../protect";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const path: string = usePathname();

  const openPaths = ["/"];

  const isOpenPath = openPaths.includes(path);

  return (
    <Suspense fallback={<Loader />}>
      {/* {isOpenPath ? children : <Protect>{children}</Protect>} */}
      <Protect>{children}</Protect>
    </Suspense>
  );
};

export default AuthProvider;
