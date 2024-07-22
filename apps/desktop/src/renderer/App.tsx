// apps/desktop/src/renderer/App.tsx
import React from "react";
import { SharedHeader } from "../../../../packages/ui/src/SharedHeader";

const App: React.FC = () => {
  return (
    <div>
      <SharedHeader />
      <main>
        <h2>ברוכים הבאים לאפליקציית הדסקטופ</h2>
      </main>
    </div>
  );
};

export default App;
