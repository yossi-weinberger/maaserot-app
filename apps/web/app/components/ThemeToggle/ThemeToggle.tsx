// components/ThemeToggle.tsx
"use client";
import React from "react";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  setTheme: (theme: "light" | "dark") => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ setTheme }) => {
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      החלף מצב תצוגה
    </button>
  );
};
export default ThemeToggle;
