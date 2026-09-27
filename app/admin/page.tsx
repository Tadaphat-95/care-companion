// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users') // เปิดมาให้เห็น Tab Users ก่อนเลยจะได้เช็คว่าหายหลอนยัง 555
  const [companions, setCompanions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const supabase = createClient()

  // ดึงข้อมูล Companion จาก Database จริง
  useEffect(() => {
    const fetchCompanions = async () => {
      const { data } = await supabase
        .from('companion_profiles')
        .select(`*, users (full_name, avatar_url)`)
      
      if (data) setCompanions(data)
      setIsLoading(false)
    }
    fetchCompanions()
  }, [])

  // Mock สถิติ
  const mockStats = [
    { rating: '4.9', count: 32, exp: '5 ปี' },
    { rating: '5.0', count: 46, exp: '3 ปี' },
    { rating: '4.8', count: 24, exp: '6 ปี' },
    { rating: '4.9', count: 38, exp: '4 ปี' },
    { rating: '5.0', count: 12, exp: '2 ปี' },
  ]

  // Mock ข้อมูลคำขอ (ล้างบางชื่อแปลกปลอมแล้ว)
  const mockRequests = [
    { id: '#1001', title: 'ทำบัตรประชาชนใหม่', status: 'cancelled', date: '2026-09-28', duration: '2.5 ชม.', price: '฿625', customer: 'สมหญิง รักดี', companion: 'น้องมายด์ ใส่ใจ', from: 'คอนโดลุมพินี', to: 'สำนักงานเขตจตุจักร' },
    { id: '#1002', title: 'พาคุณพ่อไปต่ออายุพาสปอร์ต', status: 'completed', date: '2026-09-28', duration: '3 ชม.', price: '฿750', customer: 'วิไลรัตน์', patient: 'คุณพ่อประเสริฐ (อายุ 68 ปี)', companion: 'พี่นก สายลุย', from: 'ซอยอารีย์', to: 'กรมการกงสุล แจ้งวัฒนะ' },
    { id: '#1003', title: 'ซื้อของเข้าบ้านที่โลตัส', status: 'completed', date: '2026-09-27', duration: '4 ชม.', price: '฿1,000', customer: 'เอกพล', companion: 'ลุงสมชาย ใจสู้', from: 'หมู่บ้านเศรษฐสิริ', to: 'โลตัส พระราม 4' },
    { id: '#1004', title: 'พาคุณแม่ไปพบแพทย์ตามนัด คลินิกตา', status: 'accepted', date: '2026-09-22', duration: '3.5 ชม.', price: '฿875', customer: 'คุณสมชาย ใจดี', patient: 'คุณแม่สมศรี (อายุ 74 ปี)', companion: 'พี่จอย พยาบาลใจดี', from: 'คอนโดเดอะเบส พหลโยธิน', to: 'โรงพยาบาลรามาธิบดี' },
    { id: '#1005', title: 'ไปติดต่อรับเงินบำนาญและอัปเดตสมุดบัญชี', status: 'active', date: '2026-09-20', duration: '2 ชม.', price: '฿600', customer: 'นพดล', companion: 'ป้าสมศรี พาเพลิน', from: 'ซอยสุขุมวิท 39', to: 'ธนาคารกสิกรไทย สาขาสยาม' }
  ]

  // 🔥 ล้างบางข้อมูล Users ใหม่หมด! เอาแต่ตัวละครของเรา
  const mockUsers = [
    { name: 'บอส (แอดมิน)', email: 'admin@test.com', phone: '080-000-0000', role: 'admin', date: '10/9/2569' },
    { name: 'คุณสมชาย (ลูกค้าเทส)', email: 'customer@test.com', phone: '081-234-5678', role: 'customer', date: '12/9/2569' },
    { name: 'สมหญิง (ผู้รับงานเทส)', email: 'companion@test.com', phone: '089-876-5432', role: 'companion', date: '12/9/2569' },
    { name: 'ป้าสมศรี พาเพลิน', email: 'somsri@gmail.com', phone: '088-111-2222', role: 'companion', date: '15/9/2569' },
    { name: 'ลุงสมชาย ใจสู้', email: 'somchai.c@gmail.com', phone: '082-333-4444', role: 'companion', date: '15/9/2569' },
    { name: 'พี่จอย พยาบาลใจดี', email: 'joy.nurse@gmail.com', phone: '083-444-5555', role: 'companion', date: '16/9/2569' },
    { name: 'คุณแม่วิไลรัตน์', email: 'wilairat@gmail.com', phone: '084-555-6666', role: 'customer', date: '18/9/2569' },
    { name: 'เอกพล', email: 'ekapol.dev@gmail.com', phone: '085-666-7777', role: 'customer', date: '20/9/2569' }
  ]

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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600">หน้าแรก</Link>
          <Link href="/companions" className="hover:text-indigo-600">ค้นหาผู้ร่วมเดินทาง</Link>
          <Link href="/admin" className="text-indigo-700 font-bold bg-indigo-50 px-4 py-2 rounded-lg flex items-center gap-2">⚙️ แผงควบคุมผู้ดูแลระบบ</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
        
        {/* Admin Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 rounded-3xl p-10 text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <p className="text-sm font-bold text-indigo-200 mb-2 flex items-center gap-2"><span className="bg-white/20 px-2 py-0.5 rounded text-xs">🛡️ แผงควบคุมระบบหลังบ้าน (Admin Console)</span></p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">ภาพรวมและบริหารจัดการ Care Companion</h1>
          <p className="text-indigo-100 text-sm">ตรวจสอบความปลอดภัย อนุมัติผู้ร่วมเดินทาง และดูแลความเรียบร้อยของคำขอรับบริการทั้งหมด</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500">ผู้ใช้งานทั้งหมด</p>
              <span className="text-indigo-500">👥</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{mockUsers.length} <span className="text-sm font-bold text-slate-500">บัญชี</span></p>
            <p className="text-[10px] text-slate-400 mt-1">Customer & Companion</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500">Companion ที่ดึงมาได้</p>
              <span className="text-emerald-500">✅</span>
            </div>
            <p className="text-2xl font-black text-emerald-600">{companions.length} <span className="text-sm font-bold text-emerald-600/60">ท่าน</span></p>
            <p className="text-[10px] text-emerald-500 font-medium mt-1">ดึงข้อมูลจาก Database จริง</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500">คำขอจัดหาผู้ช่วย</p>
              <span className="text-indigo-500">📄</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{mockRequests.length} <span className="text-sm font-bold text-slate-500">รายการ</span></p>
            <p className="text-[10px] text-slate-400 mt-1">เสร็จสิ้นแล้ว 2 งาน</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-500">มูลค่ารวมที่สำเร็จ</p>
              <span className="text-amber-500">📈</span>
            </div>
            <p className="text-2xl font-black text-slate-900">฿1,750</p>
            <p className="text-[10px] text-slate-400 mt-1">สร้างรายได้ให้ผู้รับทำ</p>
          </div>
        </div>

        {/* 🎛️ Interactive Tabs */}
        <div className="flex gap-6 border-b border-slate-200 mt-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('companions')}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'companions' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            ตรวจสอบ Companion 
            <span className={`${activeTab === 'companions' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'} px-2 py-0.5 rounded-full text-xs`}>{companions.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'requests' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            ติดตามคำขอทั้งหมด 
            <span className={`${activeTab === 'requests' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'} px-2 py-0.5 rounded-full text-xs`}>{mockRequests.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`pb-3 border-b-2 font-bold text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'users' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            รายชื่อผู้ใช้งาน 
            <span className={`${activeTab === 'users' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'} px-2 py-0.5 rounded-full text-xs`}>{mockUsers.length}</span>
          </button>
        </div>

        {/* ================= TAB 1: ตรวจสอบ COMPANIONS ================= */}
        {activeTab === 'companions' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">รายชื่อผู้ร่วมเดินทางและสถานะการตรวจสอบเอกสาร (Verification Status)</h2>
              <p className="text-xs text-slate-500 mt-1">แอดมินสามารถคลิกเพื่อดูเอกสารประวัติ หรือยกเลิกการรับรองสถานะความปลอดภัยได้ทันที</p>
            </div>

            <div className="divide-y divide-slate-100">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : companions.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm">ไม่พบข้อมูลผู้รับงานในระบบ</div>
              ) : (
                companions.map((comp: any) => {
                  const idStr = String(comp.user_id)
                  const statIndex = (idStr.charCodeAt(0) + idStr.charCodeAt(idStr.length - 1)) % mockStats.length
                  const stat = mockStats[statIndex]
                  
                  const isVerified = comp.is_verified ?? (idStr.charCodeAt(0) % 2 === 0)

                  return (
                    <div key={comp.user_id} className={`p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:bg-slate-50 transition-colors ${!isVerified ? 'bg-amber-50/20' : ''}`}>
                      <div className="flex items-center gap-4 w-full">
                        <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl overflow-hidden shrink-0">
                          {comp.users?.avatar_url ? (
                            <img src={comp.users.avatar_url} alt="profile" className="w-full h-full object-cover" />
                          ) : (
                            comp.users?.full_name?.charAt(0) || '?'
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                            {comp.users?.full_name || 'ไม่ระบุชื่อ'}
                            {isVerified ? (
                              <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> อนุมัติแล้ว (Verified)
                              </span>
                            ) : (
                              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span> รอการตรวจสอบ (Pending)
                              </span>
                            )}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1 max-w-lg">{comp.bio || 'ไม่มีคำอธิบาย'}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-1">
                            <span>ค่าบริการ: ฿{comp.hourly_rate}/ชม.</span>
                            <span>ประสบการณ์ {stat.exp}</span>
                            <span className="text-amber-500 font-bold">★ {stat.rating} ({stat.count} รีวิว)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto flex-col sm:flex-row">
                        {isVerified ? (
                          <>
                            <button className="flex-1 md:flex-none px-4 py-2 border border-blue-200 text-blue-600 bg-blue-50 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-100 transition-colors whitespace-nowrap">👁️ ดูเอกสาร</button>
                            <button className="flex-1 md:flex-none px-4 py-2 border border-rose-200 text-rose-600 bg-white rounded-lg text-xs font-bold hover:bg-rose-50 transition-colors whitespace-nowrap">⊗ เพิกถอนการอนุมัติ</button>
                          </>
                        ) : (
                          <>
                            <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 text-slate-400 bg-slate-50 rounded-lg text-xs font-bold cursor-not-allowed whitespace-nowrap">📄 ยังไม่แนบเอกสาร</button>
                            <button className="flex-1 md:flex-none px-4 py-2 border border-emerald-200 text-emerald-700 bg-emerald-50 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors shadow-sm whitespace-nowrap">✅ อนุมัติประวัติ</button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: ติดตามคำขอทั้งหมด ================= */}
        {activeTab === 'requests' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 mt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-700">สถานะ:</span>
                <select className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                  <option>ทั้งหมด ({mockRequests.length})</option>
                  <option>สิ้นสุดบริการ</option>
                  <option>ยกเลิกรายการ</option>
                  <option>รอการตอบรับ</option>
                </select>
              </div>
              <div className="relative w-full md:w-80">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input type="text" placeholder="ค้นหาชื่อธุระ, จุดรับ, ปลายทาง..." className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="space-y-4">
              {mockRequests.map((req, idx) => {
                let statusBadge, statusColor, showCancelBtn = false
                switch (req.status) {
                  case 'cancelled':
                    statusBadge = <span className="bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"><span className="text-rose-500 text-[10px]">⊗</span> ยกเลิกรายการ</span>
                    statusColor = 'border-l-4 border-l-rose-400 opacity-60'
                    break
                  case 'completed':
                    statusBadge = <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"><span className="text-emerald-500 text-[10px]">✅</span> สิ้นสุดบริการเรียบร้อย</span>
                    statusColor = 'border-l-4 border-l-emerald-400'
                    break
                  case 'accepted':
                    statusBadge = <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> ตอบรับแล้ว / รอนัดหมาย</span>
                    statusColor = 'border-l-4 border-l-blue-400'
                    showCancelBtn = true
                    break
                  case 'active':
                    statusBadge = <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"><span className="text-[10px]">🚀</span> กำลังเดินทาง / ปฏิบัติงาน</span>
                    statusColor = 'border-l-4 border-l-purple-500 shadow-md shadow-purple-100'
                    showCancelBtn = true
                    break
                }

                return (
                  <div key={idx} className={`bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-slate-50 transition-colors ${statusColor}`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{req.title}</h3>
                        {statusBadge}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1"><span className="text-slate-400">👤 ผู้จอง:</span> {req.customer}</span>
                        {req.patient && (
                          <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold border border-indigo-100 flex items-center gap-1">ผู้รับบริการ: {req.patient}</span>
                          </>
                        )}
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><span className="text-slate-400">🤝 ผู้ช่วย:</span> {req.companion}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><span className="text-slate-400">📅</span> {req.date} ({req.duration})</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <span className="text-indigo-500">📍</span> {req.from} ➔ {req.to}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                      <span className="text-lg font-black text-indigo-600">{req.price}</span>
                      {showCancelBtn && (
                        <button className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors border border-rose-100">ยกเลิกงาน</button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: รายชื่อผู้ใช้งาน ================= */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-900">ผู้ใช้งานทั้งหมดในระบบ Care Companion</h2>
              <p className="text-xs text-slate-500 mt-1">เชื่อมโยงสิทธิ์การใช้งานผ่าน Supabase PostgreSQL Profile Table</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">ชื่อผู้ใช้งาน</th>
                    <th className="px-6 py-4 font-bold">อีเมล</th>
                    <th className="px-6 py-4 font-bold">เบอร์โทรศัพท์</th>
                    <th className="px-6 py-4 font-bold">บทบาท (Role)</th>
                    <th className="px-6 py-4 font-bold">วันที่สร้างบัญชี</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockUsers.map((user, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                          {user.name.charAt(0) || '?'}
                        </div>
                        <span className="font-bold text-slate-900">{user.name}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{user.email}</td>
                      <td className="px-6 py-4 text-slate-500">{user.phone}</td>
                      <td className="px-6 py-4">
                        {user.role === 'admin' && <span className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><span className="text-[10px]">🛡️</span> Admin</span>}
                        {user.role === 'companion' && <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><span className="text-[10px]">🤝</span> Companion</span>}
                        {user.role === 'customer' && <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit"><span className="text-[10px]">👤</span> Customer</span>}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">{user.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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