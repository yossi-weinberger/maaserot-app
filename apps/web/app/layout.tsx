// "use client";
import { Metadata } from "next";
import { ElectronWrapper } from "../app/components/ElectronWrapper";
import { Sidebar } from "../app/components/Sidebar/Sidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "מחשבון מעשרות",
  description: "אפליקציית מחשבון מעשרות",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ElectronWrapper>
          <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
          </div>
        </ElectronWrapper>
      </body>
    </html>
  );
}

// import { Metadata } from "next";
// import { ElectronWrapper } from "../app/components/ElectronWrapper";

// export const metadata: Metadata = {
//   title: "מחשבון מעשרות",
//   description: "אפליקציית מחשבון מעשרות",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="he" dir="rtl">
//       <body>
//         <ElectronWrapper>{children}</ElectronWrapper>
//       </body>
//     </html>
//   );
// }
