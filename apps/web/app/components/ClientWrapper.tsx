// app/components/ClientWrapper.tsx
"use client";

import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { ElectronWrapper } from "./ElectronWrapper";
import { Sidebar } from "./Sidebar/Sidebar";
import ErrorBoundary from "./ErrorBoundary"; // יש ליצור קומפוננטה זו
import styles from "../layout.module.css";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ElectronWrapper>
          <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
          </div>
        </ElectronWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
