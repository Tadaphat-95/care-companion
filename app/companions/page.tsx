// app/companions/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

function CompanionsContent() {
  const [companions, setCompanions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryFilter = searchParams.get('category')
  
  const supabase = createClient()

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

  // Logic การกรอง: จับคู่ Category กับ Tag
  const filteredCompanions = companions.filter((comp) => {
    const name = comp.users?.full_name?.toLowerCase() || ''
    const bio = comp.bio?.toLowerCase() || ''
    const skillsText = (comp.skills || []).join(' ').toLowerCase()
    const allText = `${name} ${bio} ${skillsText}`
    
    const matchSearch = allText.includes(searchQuery.toLowerCase())
    
    let matchCategory = true
    if (categoryFilter) {
      const categoryKeywords: Record<string, string[]> = {
        'โรงพยาบาล': ['โรงพยาบาล', 'พยาบาล', 'ผู้ป่วย', 'ปฐมพยาบาล', 'คลินิก', 'แพทย์'],
        'ธนาคาร': ['ธนาคาร', 'การเงิน', 'ธุรกรรม', 'กดเงิน'],
        'ราชการ': ['ราชการ', 'เอกสาร', 'อำเภอ', 'เขต', 'วีซ่า', 'ต่ออายุ'],
        'ซื้อของ': ['ซื้อของ', 'ตลาด', 'ช้อปปิ้ง', 'ยกของ', 'แม่บ้าน', 'ซูเปอร์'],
        'ทั่วไป': ['ทั่วไป', 'เพื่อน', 'ทำบุญ', 'คาเฟ่', 'เที่ยว', 'เพื่อนคุย', 'ขับรถ']
      }
      const keywordsToMatch = categoryKeywords[categoryFilter] || [categoryFilter]
      matchCategory = keywordsToMatch.some(kw => allText.includes(kw.toLowerCase()))
    }

    return matchSearch && matchCategory
  })

  const mockStats = [
    { rating: '4.9', count: 32, exp: '5 ปี' },
    { rating: '5.0', count: 46, exp: '3 ปี' },
    { rating: '4.8', count: 24, exp: '6 ปี' },
    { rating: '4.9', count: 38, exp: '4 ปี' },
    { rating: '5.0', count: 12, exp: '2 ปี' },
  ]

  const clearCategory = () => {
    router.push('/companions')
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
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

      {/* HEADER & SEARCH */}
      <div className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">ค้นหาผู้ช่วย</h1>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-slate-500">รายชื่อผู้ช่วยทั้งหมดที่พร้อมให้บริการ</p>
              {categoryFilter && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  หมวดหมู่: {categoryFilter}
                  <button onClick={clearCategory} className="hover:text-red-500 ml-1">✕</button>
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input 
                type="text" 
                placeholder="ค้นหาชื่อผู้ช่วย..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm shadow-sm"
              />
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap border border-indigo-100">
              พบ {filteredCompanions.length} ท่าน
            </div>
          </div>
        </div>
      </div>

      {/* COMPANION LIST */}
      <main className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredCompanions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
            <span className="text-4xl mb-4">🥲</span>
            <h3 className="text-lg font-semibold text-slate-700">ไม่พบผู้ช่วยที่ตรงกับเงื่อนไข</h3>
            <button onClick={clearCategory} className="mt-4 px-4 py-2 bg-indigo-50 text-sm text-indigo-600 rounded-lg font-bold hover:bg-indigo-100">
              ดูรายชื่อผู้ช่วยทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanions.map((comp: any) => {
              const idStr = String(comp.user_id)
              const statIndex = (idStr.charCodeAt(0) + idStr.charCodeAt(idStr.length - 1)) % mockStats.length
              const stat = mockStats[statIndex]

              return (
                <div key={comp.user_id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col h-full overflow-hidden">
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
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <span className="flex items-center text-amber-500 font-bold">★ {stat.rating}</span>
                            <span>({stat.count})</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span>{stat.exp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-indigo-600">฿{comp.hourly_rate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{comp.bio}</p>
                    <div className="space-y-3 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {comp.skills?.map((skill: string, index: number) => (
                          <span key={index} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link href={`/companions/${comp.user_id}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors border border-indigo-100 hover:border-indigo-600">
                      เลือกผู้ช่วยคนนี้ <span>›</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <CompanionsContent />
    </Suspense>
  )
}