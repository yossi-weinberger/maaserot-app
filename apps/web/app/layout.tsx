import { Metadata } from "next";
import { ElectronWrapper } from "../app/components/ElectronWrapper";

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
        <ElectronWrapper>{children}</ElectronWrapper>
      </body>
    </html>
  );
}
