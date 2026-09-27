import type { Metadata } from "next";
import { Prompt } from "next/font/google"; // ใช้ฟอนต์ Prompt เพราะมีหัว อ่านง่ายสำหรับคนไทย
import "./globals.css";

const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Care Companion | อุ่นใจไปด้วยกัน",
  description: "แพลตฟอร์มผู้ช่วยร่วมเดินทางสำหรับผู้สูงอายุและผู้ที่ต้องการความช่วยเหลือ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${promptFont.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}