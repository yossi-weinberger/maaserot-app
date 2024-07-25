"use client";

import React, { useEffect, useState } from "react";

export function ElectronOnly({ children }) {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(Boolean(window.electron?.isElectron));
  }, []);

  if (!isElectron) return null;

  return <>{children}</>;
}

// "use client";

// import React, { useEffect, useState } from "react";

// export function ElectronOnly({ children }) {
//   const [isElectron, setIsElectron] = useState(false);

//   useEffect(() => {
//     setIsElectron(
//       typeof window !== "undefined" && window.electron?.isElectron === true
//     );
//   }, []);

//   if (!isElectron) return null;

//   return <>{children}</>;
// }
