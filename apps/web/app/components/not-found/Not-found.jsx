"use client";
import Link from "next/link";
import styles from "./not-found.module.css";
import { useTheme } from "../../context/ThemeContext";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>אופס! הדף לא נמצא</p>
        <p className={styles.description}>
          הדף הזה לא חושב, משמע הוא גם לא קיים
        </p>
        <Link href="./" className={styles.button}>
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
