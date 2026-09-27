// app/customer/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('active') // 'active' | 'history'

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900">Care Companion</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600">หน้าแรก</Link>
          <Link href="/companions" className="hover:text-indigo-600">ค้นหาผู้ร่วมเดินทาง</Link>
          <Link href="/customer" className="text-indigo-700 font-bold bg-indigo-50 px-4 py-2 rounded-lg">การจองของฉัน</Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
        {/* Profile Header */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl overflow-hidden shrink-0">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                คุณสมชาย ใจดี <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs px-2 py-0.5 rounded-full font-semibold">ลูกค้า (Customer)</span>
              </h1>
              <p className="text-sm text-slate-500">somchai.care@gmail.com</p>
              <p className="text-sm text-indigo-600 font-medium flex items-center gap-1 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                081-234-5678
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">✎ แก้ไขโปรไฟล์</button>
            <Link href="/companions" className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 text-center flex items-center justify-center gap-2 transition-all">
              ⊕ สร้างคำขอรับบริการใหม่
            </Link>
          </div>
        </section>

        {/* 🎛️ Interactive Tabs */}
        <div className="flex gap-6 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('active')}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === 'active' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            คำขอที่กำลังดำเนินการ 
            <span className={`${activeTab === 'active' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'} px-2 py-0.5 rounded-full text-xs`}>2</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors ${activeTab === 'history' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            ประวัติการใช้บริการที่เสร็จสิ้น 
            <span className={`${activeTab === 'history' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'} px-2 py-0.5 rounded-full text-xs`}>1</span>
          </button>
        </div>

        {/* ================= TAB 1: ACTIVE (กำลังดำเนินการ) ================= */}
        {activeTab === 'active' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* CARD 1: กำลังเดินทาง (สีม่วง) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-purple-200 transition-colors">
              <div className="p-6 border-b border-slate-100">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">ไปติดต่อรับเงินบำนาญและอัปเดตสมุดบัญชี</h2>
                    <p className="text-xs text-slate-400 mt-1">รหัสคำขอ: #222222 • สร้างเมื่อ: 17/9/2569</p>
                  </div>
                  <span className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                    <span className="text-[12px]">🚀</span> กำลังเดินทาง / ปฏิบัติงาน
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><span className="text-indigo-500">📅</span> วันเวลาเดินทาง</p>
                    <p className="text-sm font-bold text-slate-900">2026-09-20 เวลา 13:00 น.</p>
                    <p className="text-xs text-slate-500 mt-1">ระยะเวลา: 2 ชม.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><span className="text-rose-500">📍</span> เส้นทาง</p>
                    <p className="text-xs text-slate-700 truncate"><span className="font-bold">ต้นทาง:</span> ซอยสุขุมวิท 39</p>
                    <p className="text-xs text-slate-700 truncate mt-1"><span className="font-bold">ปลายทาง:</span> สยามพารากอน ชั้น 4</p>
                  </div>
                  <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">👤 ผู้ร่วมเดินทาง & ค่าบริการ</p>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1">🤝 คุณธนกร ร่วมทาง (พี่กร)</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">📞 โทร: 086-555-1234</p>
                    <p className="text-xs text-indigo-700 font-bold mt-1">ประมาณการ: ฿600</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/50 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between text-sm border-b border-slate-100 pb-4 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-indigo-500">👤</span> <span className="font-bold text-slate-700">ผู้รับบริการ:</span> คุณสมชาย ใจดี (อายุ 45 ปี) 
                    <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full border border-slate-200 font-bold flex items-center gap-1"><span className="text-[12px]">🚶</span> เดินคล่องปกติ</span>
                  </div>
                  <div className="text-xs shrink-0">
                    <span className="text-slate-500">ติดต่อฉุกเฉิน: </span> <span className="font-bold text-rose-600">คุณพัชรี ใจดี (ภรรยา) (089-111-2222)</span>
                  </div>
                </div>
                
                <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-lg text-sm flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5">⚠️</span>
                  <p className="text-slate-700"><span className="font-bold">ความต้องการพิเศษ:</span> ช่วยรอคิวและดูเอกสารให้เรียบร้อย</p>
                </div>
                
                <div className="flex justify-end pt-2">
                  <button className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-emerald-100 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    โทรหาผู้ช่วย (086-555-1234)
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: รอการตอบรับ (สีเหลือง) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-amber-200 transition-colors">
              <div className="p-6 border-b border-slate-100">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">หาผู้ช่วยร่วมเดินทางไปตรวจสุขภาพประจำปี</h2>
                    <p className="text-xs text-slate-400 mt-1">รหัสคำขอ: #444444 • สร้างเมื่อ: 19/9/2569</p>
                  </div>
                  <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                    <span className="text-[12px]">🕒</span> รอการตอบรับ
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><span className="text-indigo-500">📅</span> วันเวลาเดินทาง</p>
                    <p className="text-sm font-bold text-slate-900">2026-09-25 เวลา 07:00 น.</p>
                    <p className="text-xs text-slate-500 mt-1">ระยะเวลา: 4 ชม.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><span className="text-rose-500">📍</span> เส้นทาง</p>
                    <p className="text-xs text-slate-700 truncate"><span className="font-bold">ต้นทาง:</span> ถนนจรัญสนิทวงศ์ ซอย 42</p>
                    <p className="text-xs text-slate-700 truncate mt-1"><span className="font-bold">ปลายทาง:</span> โรงพยาบาลศิริราช</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">👤 ผู้ร่วมเดินทาง & ค่าบริการ</p>
                    <p className="text-sm font-bold text-amber-600 flex items-center gap-1">📢 รอผู้ช่วยในพื้นที่กดรับงาน</p>
                    <p className="text-xs text-indigo-700 font-bold mt-2">ประมาณการ: ฿1,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: HISTORY (ประวัติที่เสร็จสิ้น) ================= */}
        {activeTab === 'history' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* CARD: ประวัติ (สีเขียว) - Gen ข้อมูลขึ้นใหม่ให้สมจริง */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
              <div className="p-6 border-b border-slate-100">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 line-through decoration-slate-300 decoration-2">พาคุณพ่อไปต่ออายุพาสปอร์ต</h2>
                    <p className="text-xs text-slate-400 mt-1">รหัสคำขอ: #555555 • สร้างเมื่อ: 10/9/2569</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
                    <span className="text-[12px]">✅</span> สิ้นสุดบริการเรียบร้อย
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><span className="text-indigo-500">📅</span> วันเวลาเดินทาง</p>
                    <p className="text-sm font-bold text-slate-600">2026-09-12 เวลา 10:00 น.</p>
                    <p className="text-xs text-slate-400 mt-1">ระยะเวลา: 3 ชม.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><span className="text-rose-500">📍</span> เส้นทาง</p>
                    <p className="text-xs text-slate-600 truncate"><span className="font-bold">ต้นทาง:</span> บ้านพัก ซอยอารีย์</p>
                    <p className="text-xs text-slate-600 truncate mt-1"><span className="font-bold">ปลายทาง:</span> กรมการกงสุล แจ้งวัฒนะ</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 mb-1 flex items-center gap-1">👤 ผู้ร่วมเดินทาง & ค่าบริการ</p>
                    <p className="text-sm font-bold text-slate-700 flex items-center gap-1">🤝 พี่นก สายลุย</p>
                    <p className="text-xs text-emerald-600/70 font-semibold mt-1">📞 โทร: 081-111-2222</p>
                    <p className="text-xs text-indigo-700/70 font-bold mt-1">ยอดสุทธิ: ฿750</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50/30 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between text-sm border-b border-slate-100 pb-4 gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-slate-400">👤</span> <span className="font-bold text-slate-500">ผู้รับบริการ:</span> <span className="text-slate-600">คุณพ่อประเสริฐ (อายุ 68 ปี)</span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full border border-slate-200 font-bold flex items-center gap-1"><span className="text-[12px]">🦯</span> เดินช้า/ไม้เท้า</span>
                  </div>
                </div>
                
                <div className="bg-slate-100/50 border border-slate-200 p-3 rounded-lg text-sm flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">📝</span>
                  <p className="text-slate-500"><span className="font-bold">ความต้องการพิเศษ:</span> ช่วยพยุงตอนขึ้นบันไดและเตรียมเอกสารให้พร้อม</p>
                </div>
                
                {/* Review status bottom right */}
                <div className="flex justify-end pt-4">
                  <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    ให้คะแนนรีวิวแล้ว ขอบคุณครับ
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-20">
        <div className="bg-[#423101] border-t-4 border-[#b78b01] text-[#fde484] text-center py-3 text-sm font-bold flex items-center justify-center gap-2">
          <span>🛡️</span> ข้อควรทราบ: ผู้ร่วมเดินทาง (Companion) มีหน้าที่ช่วยเหลือและอำนวยความสะดวกในการเดินทางและการทำธุระเท่านั้น <span className="underline underline-offset-4">ไม่ใช่ผู้ให้บริการทางการแพทย์หรือผู้ดูแลรักษาผู้ป่วย</span>
        </div>
        <div className="bg-[#0f172a] text-slate-400 py-16 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <span className="text-xl font-extrabold text-white">Care Companion</span>
              </Link>
              <p className="text-xs leading-relaxed">แพลตฟอร์มตัวกลางเพื่อเชื่อมโยงผู้ที่ต้องการผู้ช่วยร่วมเดินทาง เช่น ผู้สูงอายุและผู้ที่เดินทางคนเดียวไม่สะดวก ไปทำธุระนอกบ้านอย่างอุ่นใจและปลอดภัย</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">ประเภทบริการ</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-white transition-colors">พาไปพบแพทย์ตามนัด / รพ.</a></li>
                <li><a href="#" className="hover:text-white transition-colors">พาไปธนาคาร / ติดต่อราชการ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">พาซื้อสินค้า / ซูเปอร์มาร์เก็ต</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ร่วมเดินทางทำธุระทั่วไป</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">เข้าสู่ส่วนการทำงาน</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="/customer" className="hover:text-white transition-colors flex items-center gap-1">👤 สำหรับลูกค้า (Customer)</a></li>
                <li><a href="/companion" className="hover:text-white transition-colors flex items-center gap-1">🤝 สำหรับผู้รับงาน (Companion)</a></li>
                <li><a href="/admin" className="hover:text-white transition-colors flex items-center gap-1">🛡️ สำหรับผู้ดูแลระบบ (Admin)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">ข้อมูลระบบ & เทคโนโลยี</h3>
              <ul className="space-y-2 text-xs">
                <li>Framework: Next.js (App Router)</li>
                <li>Styling: TailwindCSS</li>
                <li>Authentication: Supabase Auth</li>
                <li>Database: Supabase PostgreSQL + RLS</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
            <p>© 2026 Care Companion Web Application. พัฒนาเพื่อการศึกษาและการสอบ Midterm.</p>
            <p className="mt-2 md:mt-0">สร้างด้วยความใส่ใจเพื่อความปลอดภัยของผู้สูงอายุ ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}