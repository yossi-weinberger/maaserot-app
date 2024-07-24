"use client";

import React, { ReactNode, useLayoutEffect, useState } from "react";

interface WebOnlyProps {
  children: ReactNode;
}

export function WebOnly({ children }: { children: ReactNode }) {
  const [isWeb, setIsWeb] = useState(false);

  useLayoutEffect(() => {
    setIsWeb(!(window as any).electron?.isElectron);
  }, []);

  if (!isWeb) return null;

  return <>{children}</>;
}
