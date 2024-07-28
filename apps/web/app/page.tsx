"use client";

import React from "react";
import { WebOnly } from "../app/components/WebOnly";
import { ElectronOnly } from "../app/components/ElectronOnly";
import Link from "next/link";

export default function ExamplePage() {
  return (
    <div className="container">
      <h1>מחשבון מעשרות</h1>

      {/* תוכן משותף */}
      <section>
        <h2>תוכן משותף לווב ולדסקטופ</h2>
        <p>
          ברוכים הבאים למחשבון המעשרות. כאן תוכלו לחשב את המעשרות שלכם בקלות
          ובמהירות.
        </p>
        <button>התחל חישוב</button>
        <Link href="/test">טסט</Link>
      </section>

      {/* תוכן רק לווב */}
      <WebOnly>
        <section>
          <h2>תכונות ייחודיות לגרסת הווב</h2>
          <ul>
            <li>שמירה אוטומטית בענן</li>
            <li>שיתוף חישובים עם אחרים</li>
            <li>גישה מכל מכשיר</li>
          </ul>
          <a href="/login">התחבר לחשבון שלך</a>
          <Link href="/test">1טסט</Link>
        </section>
      </WebOnly>

      {/* תוכן רק לדסקטופ */}
      <ElectronOnly>
        <section>
          <h2>תכונות ייחודיות לגרסת הדסקטופ</h2>
          <ul>
            <li>עבודה ללא חיבור לאינטרנט</li>
            <li>שמירה מקומית של נתונים</li>
            <li>ייצוא דוחות למחשב</li>
          </ul>
          <button onClick={() => console.log("פתיחת הגדרות מקומיות")}>
            פתח הגדרות מקומיות
          </button>
          <Link href="/test">2טסט</Link>
        </section>
      </ElectronOnly>

      {/* תוכן משותף נוסף */}
      <footer>
        <p>© 2024 מחשבון מעשרות. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
