// "use client";

// import React, { useLayoutEffect, useState } from "react";

// export const useIsWeb = () => {
//   const [isWeb, setIsWeb] = useState(true);

//   useLayoutEffect(() => {
//     setIsWeb(
//       typeof window !== "undefined" &&
//         window.navigator.userAgent.toLowerCase().indexOf(" electron/") === -1
//     );
//   }, []);

//   return isWeb;
// };

// export const WebOnly = ({ children }) => {
//   const isWeb = useIsWeb();
//   return isWeb ? children : null;
// };

// const WebWrapper = ({ children }) => {
//   const isWeb = useIsWeb();
//   return <div className={isWeb ? "web-app" : "electron-app"}>{children}</div>;
// };

// export default WebWrapper;
