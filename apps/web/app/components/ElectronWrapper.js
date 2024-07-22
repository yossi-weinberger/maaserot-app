"use client";

import React, { useLayoutEffect, useState } from "react";

export const useIsElectron = () => {
  const [isElectron, setIsElectron] = useState(false);

  useLayoutEffect(() => {
    setIsElectron(
      typeof window !== "undefined" &&
        window.navigator.userAgent.toLowerCase().indexOf(" electron/") > -1
    );
  }, []);

  return isElectron;
};

export const ElectronOnly = ({ children }) => {
  const isElectron = useIsElectron();
  return isElectron ? children : null;
};

const ElectronWrapper = ({ children }) => {
  const isElectron = useIsElectron();
  return (
    <div className={isElectron ? "electron-app" : "web-app"}>{children}</div>
  );
};

export default ElectronWrapper;
