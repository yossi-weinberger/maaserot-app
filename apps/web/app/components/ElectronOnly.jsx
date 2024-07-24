"use client";

import React, { useEffect, useState } from "react";

export function ElectronOnly({ children }) {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(window.electron?.isElectron || false);
  }, []);

  if (!isElectron) return null;

  return <>{children}</>;
}
