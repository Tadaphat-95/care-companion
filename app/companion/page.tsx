// app/companion/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function CompanionDashboard() {
  const [activeTab, setActiveTab] = useState("new"); // 'new' | 'active' | 'history'

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900">
            Care Companion
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600">
            หน้าแรก
          </Link>
          <Link href="/companions" className="hover:text-indigo-600">
            ค้นหาผู้ร่วมเดินทาง
          </Link>
          <Link
            href="/companion"
            className="text-indigo-700 font-bold bg-indigo-50 px-4 py-2 rounded-lg"
          >
            งานที่ได้รับมอบหมาย
          </Link>
          <Link href="/companion" className="hover:text-indigo-600">
            ข้อมูลบริการ
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-6">
        {/* Warning Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 items-start shadow-sm">
          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0 mt-0.5">
            !
          </div>
          <div>
            <h3 className="font-bold text-amber-800 text-sm">
              สถานะบัญชี: รอผู้ดูแลระบบ (Admin) อนุมัติและรับรองประวัติ
            </h3>
            <p className="text-amber-700/80 text-xs mt-1 leading-relaxed">
              บัญชีผู้ร่วมเดินทางของคุณยังไม่ได้รับการอนุมัติจากแอดมิน
              คุณสามารถดูรายละเอียดคำขอและแก้ไขข้อมูลบริการได้ แต่จะยัง
              <span className="font-bold">ไม่สามารถกดรับงานได้</span>
              จนกว่าแอดมินจะกดอนุมัติเข้าทำงานในระบบ
            </p>
          </div>
        </div>

        {/* Profile Header */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl overflow-hidden shrink-0">
              จ
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                พี่จอย ใจดี
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded font-bold">
                  ⏳ รอการอนุมัติ (Pending)
                </span>
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  ★ 5.0{" "}
                  <span className="text-slate-400 font-normal">(0 รีวิว)</span>
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>ค่าบริการ: ฿250/ชม.</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>ประสบการณ์ 2 ปี</span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-1">
                📞 เบอร์ติดต่อรับงานของคุณ:{" "}
                <span className="font-bold">081-234-5678</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              สถานะ: พร้อมรับงาน
            </button>
            <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              ⚙️ แก้ไขข้อมูลบริการ
            </button>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 right-4 w-3 h-3 bg-amber-500 rounded-full"></div>
            <p className="text-sm font-bold text-slate-500 mb-1">
              คำขอใหม่ที่รอการตอบรับ
            </p>
            <p className="text-3xl font-black text-slate-900">
              1 <span className="text-lg font-bold text-slate-500">รายการ</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 right-4 w-3 h-3 bg-indigo-500 rounded-full"></div>
            <p className="text-sm font-bold text-slate-500 mb-1">
              งานที่อยู่ระหว่างดำเนินการ
            </p>
            <p className="text-3xl font-black text-slate-900">
              0 <span className="text-lg font-bold text-slate-500">รายการ</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-4 right-4 text-emerald-500 text-xl font-black">
              ฿
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1">
              รายได้สะสม (งานที่เสร็จสิ้น)
            </p>
            <p className="text-3xl font-black text-emerald-600">฿0</p>
          </div>
        </div>

        {/* 🎛️ Interactive Tabs */}
        <div className="flex gap-6 border-b border-slate-200 mt-8">
          <button
            onClick={() => setActiveTab("new")}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === "new" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            คำขอร่วมเดินทางใหม่
            <span
              className={`${activeTab === "new" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"} px-2 py-0.5 rounded-full text-xs`}
            >
              1
            </span>
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === "active" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            งานที่กำลังปฏิบัติการ
            <span
              className={`${activeTab === "active" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"} px-2 py-0.5 rounded-full text-xs`}
            >
              0
            </span>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === "history" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            ประวัติงานที่สำเร็จแล้ว
            <span
              className={`${activeTab === "history" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"} px-2 py-0.5 rounded-full text-xs`}
            >
              0
            </span>
          </button>
        </div>

        {/* ================= TAB 1: NEW (คำขอใหม่) ================= */}
        {activeTab === "new" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-4 hover:border-indigo-200 transition-colors cursor-pointer group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      หาผู้ช่วยร่วมเดินทางไปตรวจสุขภาพประจำปี
                      <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-[10px] px-2 py-1 rounded font-bold">
                        ไปพบแพทย์ / โรงพยาบาล
                      </span>
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1">
                        📢 คำขอเปิดรับทั่วไปในพื้นที่
                      </span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-2">
                      ผู้จอง: คุณสมชาย ใจดี • เบอร์โทร: 081-234-5678
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-bold mb-1">
                      ค่าบริการที่จะได้รับ
                    </p>
                    <p className="text-2xl font-black text-emerald-600">
                      ฿1,000
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                  <div>
                    <p className="font-bold text-slate-700 mb-1">วันเวลา:</p>
                    <p className="text-slate-900">
                      2026-09-25 เวลา 07:00 น. (4 ชม.)
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mb-1">
                      จุดรับ - ปลายทาง:
                    </p>
                    <p className="text-slate-900 truncate">
                      ถนนจรัญสนิทวงศ์ ซอย 42 ➔ โรงพยาบาลศิริราช
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-white border border-slate-200 p-4 rounded-xl text-sm">
                  <p className="font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <span className="text-indigo-500">📄</span>{" "}
                    รายละเอียดคำขอจากลูกค้า:
                  </p>
                  <p className="text-slate-600">
                    ต้องการผู้ช่วยพาไปตรวจเลือดและเอกซเรย์ที่ รพ.ศิริราช
                    ปิยมหาราชการุณย์
                  </p>
                </div>

                {/* Action Buttons for Companion */}
                <div className="mt-4 flex gap-3 justify-end border-t border-slate-100 pt-4">
                  <button className="px-6 py-2 border border-slate-200 text-slate-500 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                    ปฏิเสธ
                  </button>
                  <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-colors">
                    ✅ กดรับงานนี้
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ACTIVE (กำลังดำเนินการ) ================= */}
        {activeTab === "active" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm mt-4">
              <span className="text-5xl mb-4 opacity-50">🏃‍♂️</span>
              <h3 className="text-lg font-semibold text-slate-700">
                ยังไม่มีงานที่กำลังดำเนินการ
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                เมื่องานเริ่มขึ้น ระบบจะแสดงรายละเอียดการติดต่อและการนำทางที่นี่
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HISTORY (ประวัติที่เสร็จสิ้น) ================= */}
        {activeTab === "history" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm mt-4">
              <span className="text-5xl mb-4 opacity-50">📂</span>
              <h3 className="text-lg font-semibold text-slate-700">
                ยังไม่มีประวัติการรับงาน
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                รับงานแรกของคุณเพื่อเริ่มต้นสร้างรายได้และคะแนนรีวิว!
              </p>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-20">
        <div className="bg-[#423101] border-t-4 border-[#b78b01] text-[#fde484] text-center py-3 text-sm font-bold flex items-center justify-center gap-2">
          <span>🛡️</span> ข้อควรทราบ: ผู้ร่วมเดินทาง (Companion)
          มีหน้าที่ช่วยเหลือและอำนวยความสะดวกในการเดินทางและการทำธุระเท่านั้น{" "}
          <span className="underline underline-offset-4">
            ไม่ใช่ผู้ให้บริการทางการแพทย์หรือผู้ดูแลรักษาผู้ป่วย
          </span>
        </div>
        <div className="bg-[#0f172a] text-slate-400 py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="text-xl font-extrabold text-white">
                  Care Companion
                </span>
              </Link>
              <p className="text-xs leading-relaxed">
                แพลตฟอร์มตัวกลางเพื่อเชื่อมโยงผู้ที่ต้องการผู้ช่วยร่วมเดินทาง
                เช่น ผู้สูงอายุและผู้ที่เดินทางคนเดียวไม่สะดวก
                ไปทำธุระนอกบ้านอย่างอุ่นใจและปลอดภัย
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">ประเภทบริการ</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    พาไปพบแพทย์ตามนัด / รพ.
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    พาไปธนาคาร / ติดต่อราชการ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    พาซื้อสินค้า / ซูเปอร์มาร์เก็ต
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    ร่วมเดินทางทำธุระทั่วไป
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">เข้าสู่ส่วนการทำงาน</h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="/customer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    👤 สำหรับลูกค้า (Customer)
                  </a>
                </li>
                <li>
                  <a
                    href="/companion"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    🤝 สำหรับผู้รับงาน (Companion)
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    🛡️ สำหรับผู้ดูแลระบบ (Admin)
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">
                ข้อมูลระบบ & เทคโนโลยี
              </h3>
              <ul className="space-y-2 text-xs">
                <li>Framework: Next.js (App Router)</li>
                <li>Styling: TailwindCSS</li>
                <li>Authentication: Supabase Auth</li>
                <li>Database: Supabase PostgreSQL + RLS</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
            <p>
              © 2026 Care Companion Web Application. พัฒนาเพื่อการศึกษาและการสอบ
              Midterm.
            </p>
            <p className="mt-2 md:mt-0">
              สร้างด้วยความใส่ใจเพื่อความปลอดภัยของผู้สูงอายุ ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
