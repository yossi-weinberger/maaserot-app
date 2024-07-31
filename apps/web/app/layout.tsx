// app/layout.tsx
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import "./globals.css";
import { ElectronWrapper } from "../app/components/ElectronWrapper";
import { Sidebar } from "../app/components/Sidebar/Sidebar";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <html lang="he" dir="rtl">
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta name="description" content={process.env.siteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ElectronWrapper>
          <div className={styles.layout}>
            <Sidebar setTheme={setTheme} />
            <main className={styles.main}>{children}</main>
          </div>
        </ElectronWrapper>
      </body>
    </html>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import "./globals.css";
// import { Metadata } from "next";
// import { ElectronWrapper } from "../app/components/ElectronWrapper";
// import { Sidebar } from "../app/components/Sidebar/Sidebar";
// import styles from "./layout.module.css";

// // export const metadata: Metadata = {
// //   title: "מחשבון מעשרות",
// //   description: "אפליקציית מחשבון מעשרות",
// // };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     document.body.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <html lang="he" dir="rtl">
//       <body>
//         <ElectronWrapper>
//           <div className={styles.layout}>
//             <Sidebar setTheme={setTheme} />
//             <main className={styles.main}>{children}</main>
//           </div>
//         </ElectronWrapper>
//       </body>
//     </html>
//   );
// }
