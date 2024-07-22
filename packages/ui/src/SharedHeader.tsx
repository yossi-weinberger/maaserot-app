// packages/ui/src/SharedHeader.tsx
import React from "react";

export const SharedHeader: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: "#4a5568",
        color: "white",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h1>מחשבון מעשרות</h1>
      <p>גרסה משותפת לאתר ולדסקטופ</p>
    </header>
  );
};
