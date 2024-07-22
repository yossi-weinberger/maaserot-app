import { ReactNode } from "react";
import ElectronWrapper from "../app/components/ElectronWrapper";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <ElectronWrapper>{children}</ElectronWrapper>
      </body>
    </html>
  );
}
