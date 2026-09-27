// app/companions/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function CompanionsPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )

  const { data: companions, error } = await supabase
    .from('companion_profiles')
    .select(`
      *,
      users (
        full_name,
        avatar_url
      )
    `)

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900">Care Companion <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">TH</span></span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#services" className="hover:text-indigo-600 transition-colors">ประเภทธุระ</Link>
          <Link href="/#how-it-works" className="hover:text-indigo-600 transition-colors">ขั้นตอนการใช้งาน</Link>
          <Link href="/" className="rounded-full bg-slate-100 px-6 py-2.5 text-slate-700 hover:bg-slate-200 transition-all font-bold">
            เข้าสู่ระบบ
          </Link>
        </div>
      </nav>

      {/* ================= HEADER & SEARCH ================= */}
      <div className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">ค้นหาผู้ช่วย</h1>
            <p className="text-slate-500 mt-1">รายชื่อผู้ช่วยทั้งหมดที่พร้อมให้บริการ</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input 
                type="text" 
                placeholder="ค้นหาชื่อผู้ช่วย..." 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap">
              พบ {companions?.length || 0} ท่าน
            </div>
          </div>
        </div>
      </div>

      {/* ================= COMPANION LIST (GRID) ================= */}
      <main className="max-w-7xl mx-auto px-4">
        {(!companions || companions.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <span className="text-4xl mb-4">🥲</span>
            <h3 className="text-lg font-semibold text-slate-700">ยังไม่มีข้อมูล Companion</h3>
            <p className="text-slate-500 text-sm">ระบบกำลังรอผู้ให้บริการมาร่วมงานกับเรา</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companions.map((comp: any) => (
              <div key={comp.user_id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col h-full overflow-hidden">
                
                {/* 1. Header: รูป ชื่อ ราคา */}
                <div className="p-6 pb-4 border-b border-slate-100">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl overflow-hidden shrink-0">
                        {comp.users?.avatar_url ? (
                          <img src={comp.users.avatar_url} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                          comp.users?.full_name?.charAt(0) || '?'
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-slate-900 text-lg line-clamp-1">
                            {comp.users?.full_name || 'ไม่ระบุชื่อ'}
                          </h3>
                          {comp.is_verified && (
                            <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="flex items-center text-amber-500 font-bold">
                            ★ 4.9
                          </span>
                          <span>(32 รีวิว)</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span>ประสบการณ์ 5 ปี</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-2xl font-black text-indigo-600">฿{comp.hourly_rate}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Body: Bio, Skills, Location */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {comp.bio}
                  </p>

                  <div className="space-y-3 mt-auto">
                    {/* ข้อมูลยานพาหนะ (Mockup UI) */}
                    <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                        รถยนต์ส่วนตัว
                      </div>
                      <span className="text-[10px] bg-white border border-slate-200 text-slate-400 px-2 py-1 rounded">เข้าสู่ระบบเพื่อดูทะเบียน</span>
                    </div>

                    {/* Skills Tag */}
                    <div className="flex flex-wrap gap-1.5">
                      {comp.skills?.map((skill: string, index: number) => (
                        <span key={index} className="px-2.5 py-1 bg-indigo-50/50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-2">
                      <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span className="line-clamp-1">พื้นที่: {comp.service_areas?.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Footer: Button */}
                <div className="p-4 pt-0">
                  <Link href="/" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors border border-indigo-100 hover:border-indigo-600">
                    เลือกผู้ช่วยคนนี้ <span>›</span>
                  </Link>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}