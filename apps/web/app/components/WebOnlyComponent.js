"use client";

import React from "react";
import { useIsElectron } from "./ElectronWrapper";

const WebOnlyComponent = () => {
  const isElectron = useIsElectron();

  if (isElectron) return null;

  return (
    <div>
      <h2>קומפוננטה רק לאתר</h2>
      <p>זו קומפוננטה שמופיעה רק באתר ולא באפליקציית הדסקטופ.</p>
    </div>
  );
};

export default WebOnlyComponent;
