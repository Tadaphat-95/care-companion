// app/companions/[id]/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CompanionProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params 

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

  const { data: comp } = await supabase
    .from('companion_profiles')
    .select(`*, users (full_name, avatar_url, role)`)
    .eq('user_id', id)
    .single()

  if (!comp) return notFound()

  // ข้อมูล Mock สถิติ
  const mockStats = [
    { rating: '4.9', count: 32, exp: '5 ปี' },
    { rating: '4.8', count: 46, exp: '3 ปี' },
    { rating: '4.8', count: 24, exp: '6 ปี' },
    { rating: '4.9', count: 38, exp: '4 ปี' },
    { rating: '4.8', count: 12, exp: '2 ปี' },
  ]
  const statIndex = (id.charCodeAt(0) + id.charCodeAt(id.length - 1)) % mockStats.length
  const stat = mockStats[statIndex]

  // 🔥 ข้อมูล Mock รีวิวแบบแบ่งเซ็ตตามคาแรคเตอร์
  const mockReviewSets = [
    [ // Set 0: สายดูแลผู้สูงอายุ (เหมาะกับป้าสมศรี)
      { id: 1, reviewer: "คุณแม่วิไลรัตน์", avatar: "ว", rating: 5, date: "2 วันที่แล้ว", comment: "บริการดีมากค่ะ ใจเย็น ช่วยพยุงคุณแม่ตอนขึ้นลงรถตลอดเวลา คุยเก่งด้วย ทำให้การเดินทางไปโรงพยาบาลไม่น่าเบื่อเลย แนะนำมากๆ" },
      { id: 2, reviewer: "K. นพดล", avatar: "น", rating: 5, date: "1 สัปดาห์ที่แล้ว", comment: "ขับรถนิ่มมากครับ ผู้ใหญ่ที่บ้านนั่งสบาย ไม่เวียนหัวเลย" },
      { id: 3, reviewer: "พิมดาว", avatar: "พ", rating: 4, date: "3 สัปดาห์ที่แล้ว", comment: "ป้าแกน่ารักค่ะ ดูแลเอาใจใส่ดีมาก หัก 1 ดาวเพราะแกมาถึงช้าไป 5 นาทีค่ะ" }
    ],
    [ // Set 1: สายลุย, ยกของ (เหมาะกับลุงสมชาย)
      { id: 1, reviewer: "K. เอกพล", avatar: "อ", rating: 5, date: "1 สัปดาห์ที่แล้ว", comment: "ตรงต่อเวลามากครับ พาคุณพ่อไปทำธุระที่ธนาคารเรียบร้อยดี คอยถ่ายรูปอัปเดตสถานะให้ผมทราบผ่านแชทตลอดเวลา อุ่นใจมากครับ" },
      { id: 2, reviewer: "สมหญิง", avatar: "ส", rating: 5, date: "2 สัปดาห์ที่แล้ว", comment: "ช่วยถือของหนักได้ดีมาก ลุยสุดๆ ไปซื้อของตลาดไทคือช่วยได้เยอะมากค่ะ" },
      { id: 3, reviewer: "คุณธนกร", avatar: "ธ", rating: 5, date: "1 เดือนที่แล้ว", comment: "เจรจาติดต่อเอกสารราชการเก่งมาก รู้ขั้นตอนหมด ประหยัดเวลาไปเยอะครับ" }
    ],
    [ // Set 2: สายโรงพยาบาล (เหมาะกับพี่จอย)
      { id: 1, reviewer: "นพ. สมศักดิ์", avatar: "ส", rating: 5, date: "3 วันที่แล้ว", comment: "มีความรู้พื้นฐานดีมากครับ ช่วยสรุปผลตรวจจากหมอให้ญาติฟังได้เข้าใจง่ายมาก" },
      { id: 2, reviewer: "น้องมายด์", avatar: "ม", rating: 5, date: "2 สัปดาห์ที่แล้ว", comment: "ดูแลเรื่องยาให้คุณยายเป๊ะมาก คอยเตือนเวลาทานยาตลอด ใจดีและสุภาพมากค่ะ" },
      { id: 3, reviewer: "K. วิทยา", avatar: "ว", rating: 4, date: "1 เดือนที่แล้ว", comment: "สื่อสารภาษาอังกฤษกับหมอต่างชาติได้ดีเยี่ยมครับ ช่วยได้เยอะเลย" }
    ],
    [ // Set 3: ทั่วไป 1
      { id: 1, reviewer: "ป้าพร", avatar: "พ", rating: 5, date: "2 วันที่แล้ว", comment: "เป็นกันเองมากค่ะ คุยสนุก ไปเป็นเพื่อนทำธุระแล้วไม่เหงาเลย" },
      { id: 2, reviewer: "Siriporn", avatar: "S", rating: 4, date: "1 สัปดาห์ที่แล้ว", comment: "บริการดีค่ะ ช่วยอำนวยความสะดวกเรื่องรถเข็นได้คล่องแคล่วดี" }
    ],
    [ // Set 4: ทั่วไป 2
      { id: 1, reviewer: "ธวัชชัย", avatar: "ธ", rating: 5, date: "5 วันที่แล้ว", comment: "สุภาพเรียบร้อยมากครับ ขับรถดี ไม่ปาดหน้าใคร ปลอดภัยหายห่วง" },
      { id: 2, reviewer: "Amm", avatar: "A", rating: 5, date: "2 สัปดาห์ที่แล้ว", comment: "ใส่ใจรายละเอียดเล็กๆ น้อยๆ ดีมากค่ะ เตรียมร่มและน้ำดื่มมาเผื่อด้วย" }
    ]
  ]

  // 🎯 เลือกรีวิวตามชื่อ (Personality Matching)
  const fullName = comp.users?.full_name || '';
  let reviewIndex = 3; // ค่าเริ่มต้นถ้าไม่ใช่ 3 คนนี้
  
  if (fullName.includes('สมศรี')) {
    reviewIndex = 0;
  } else if (fullName.includes('สมชาย')) {
    reviewIndex = 1;
  } else if (fullName.includes('จอย')) {
    reviewIndex = 2;
  } else {
    reviewIndex = fullName.length % mockReviewSets.length;
  }
  
  const currentReviews = mockReviewSets[reviewIndex];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900">Care Companion</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600">หน้าแรก</Link>
          <Link href="/companions" className="text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-lg">ค้นหาผู้ร่วมเดินทาง</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* ปุ่มกลับ */}
        <Link href="/companions" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          กลับไปค้นหาผู้ร่วมเดินทาง
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ================= ซ้าย: ข้อมูลรายละเอียด & รีวิว ================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* กล่องโปรไฟล์หลัก */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-32 bg-indigo-100 rounded-2xl shrink-0 flex items-center justify-center text-4xl font-bold text-indigo-500 relative">
                  {comp.users?.avatar_url ? (
                    <img src={comp.users.avatar_url} alt="profile" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    comp.users?.full_name?.charAt(0) || '?'
                  )}
                  {comp.is_verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-black text-slate-900">{comp.users?.full_name || 'ไม่ระบุชื่อ'}</h1>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <span className="text-amber-500 font-bold">★ {stat.rating}</span> 
                      ({stat.count} รีวิว)
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>ประสบการณ์ {stat.exp}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">เกี่ยวกับผู้ร่วมเดินทาง</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {comp.bio}
                </p>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4">ทักษะและความสามารถ</h3>
                <div className="flex flex-wrap gap-2">
                  {comp.skills?.map((skill: string, idx: number) => (
                    <span key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 🔥 กล่องรีวิว */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  รีวิวและความเห็นจากลูกค้าล่าสุด
                </span>
                <span className="text-sm font-bold text-slate-500">{stat.count} รีวิวทั้งหมด</span>
              </h3>

              <div className="space-y-6">
                {currentReviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-50 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{review.reviewer}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex text-amber-500 text-xs">
                               {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                            </div>
                            <span className="text-xs text-slate-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* ================= ขวา: กล่องจองและราคา ================= */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24">
              <p className="text-sm font-bold text-slate-500 mb-2">อัตราค่าบริการ</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-blue-600">฿{comp.hourly_rate}</span>
                <span className="text-slate-500 font-medium">/ ชั่วโมง</span>
              </div>

              <div className="space-y-4 text-sm mb-8 border-b border-slate-100 pb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">คะแนนความพึงพอใจ:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <span className="text-amber-500">★</span> {stat.rating} / 4.8
                  </span>
                </div>
              </div>

              <Link href="/customer" className="w-full flex items-center justify-center gap-2 bg-[#1d4ed8] text-white py-3.5 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                จองผู้ช่วยท่านนี้
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}