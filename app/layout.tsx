// app/layout.tsx (ตัวอย่างการวางโค้ด)
import type { Metadata } from "next";
import "./globals.css";
import RoleSwitcher from "@/components/RoleSwitcher"; // 👈 1. Import เข้ามา

export const metadata: Metadata = {
  title: "Care Companion",
  description: "เพื่อนร่วมทางที่คุณไว้วางใจ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">
        <RoleSwitcher /> {/* 👈 2. วางไว้บนสุดตรงนี้เลย! */}
        {children}
      </body>
    </html>
  );
}