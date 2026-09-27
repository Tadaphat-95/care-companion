// app/book/[id]/page.tsx
'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 🔥 อัปเดต: Next.js 15 บังคับให้ params เป็น Promise และใช้ use() ใน Client Component
export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params) // แกะค่า id ออกมาแบบปลอดภัย
  const companionId = resolvedParams.id
  
  const [formData, setFormData] = useState({
    serviceType: 'ซื้อสินค้า / ซูเปอร์มาร์เก็ต',
    topic: '',
    details: '',
    phone: '',
    travelerType: 'self', 
    travelerName: '',
    travelerAge: '',
    travelerGender: 'หญิง',
    mobilityLevel: 'normal', 
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalNotes: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    durationHours: '2.5',
    specialRequests: ''
  })

  const [companionRate, setCompanionRate] = useState(250)
  const estimatedTotal = parseFloat(formData.durationHours) * companionRate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // ตอนยิงเข้า DB จริง เราจะเอา companionId ไปผูกด้วย
    console.log('Booking Data to Companion ID:', companionId, formData)
    alert('ส่งคำขอจองสำเร็จ! (Mock)')
    router.push('/customer')
  }

  const handleGPSClick = () => {
    setFormData({...formData, pickupLocation: 'คอนโดเดอะเบส พหลโยธิน'})
  }

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
      </nav>

      {/* ================= FORM CONTENT ================= */}
      <main className="max-w-4xl mx-auto px-4 mt-12">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold text-indigo-600 mb-2 block">สร้างคำขอรับบริการใหม่</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">ระบุรายละเอียดความต้องการเดินทาง</h1>
          <p className="text-slate-500 text-sm">กรอกรายละเอียดสถานที่ วันเวลา และธุระของคุณ เพื่อให้ผู้ช่วยร่วมเดินทางเตรียมพร้อมอำนวยความสะดวกได้อย่างตรงใจ</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-12">
          
          {/* ================= 1. ข้อมูลธุระ ================= */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">1</div>
              <h2 className="text-lg font-bold text-slate-900">ข้อมูลธุระที่ต้องการร่วมเดินทาง</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ประเภทธุระ <span className="text-rose-500">*</span></label>
                <select 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                >
                  <option>พบแพทย์ / ไปโรงพยาบาล</option>
                  <option>ติดต่อธนาคาร / การเงิน</option>
                  <option>ติดต่อหน่วยงานราชการ</option>
                  <option>ซื้อสินค้า / ซูเปอร์มาร์เก็ต</option>
                  <option>ธุระทั่วไป</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">หัวข้อธุระสั้นๆ <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="เช่น พาคุณยายไปพบแพทย์คลินิกตา, ติดต่อทำบัตร ปชช."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">รายละเอียดเพิ่มเติมของธุระ</label>
              <textarea 
                rows={3}
                placeholder="ระบุสิ่งที่ต้องการให้ช่วยเหลือ เช่น ช่วยรอคิวรับยา, ช่วยถือเอกสาร หรือแจ้งแผนที่ต้องไป"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm resize-none"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              />
            </div>
          </section>

          {/* ================= 2. ข้อมูลผู้ร่วมเดินทาง ================= */}
          <section>
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-100">2</div>
                <h2 className="text-lg font-bold text-slate-900">ข้อมูลผู้ร่วมเดินทาง & สุขภาพ/ฉุกเฉิน</h2>
              </div>
              <span className="text-xs font-medium text-slate-400">* ข้อมูลนี้ใช้เพื่อความปลอดภัยในการดูแลเท่านั้น</span>
            </div>

            {/* เบอร์ติดต่อหลัก */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  เบอร์โทรศัพท์ของคุณ (ผู้ว่าจ้าง / ผู้ติดต่อหลัก) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">จำเป็นสำหรับให้ผู้ช่วยโทรติดต่อ</span>
              </div>
              <input 
                type="tel" 
                placeholder="089-876-5432"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm mb-2"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <p className="text-[11px] text-slate-500">* เบอร์โทรนี้จะส่งให้ผู้ช่วยร่วมเดินทาง (Companion) ทราบ เพื่อใช้โทรติดต่อยืนยันเวลานัดหมายและจุดรับ-ส่ง</p>
            </div>

            {/* เลือกใครเดินทาง */}
            <div className="mb-6 space-y-2">
              <label className="text-sm font-bold text-slate-700">ใครเป็นผู้รับบริการเดินทางในทริปนี้?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, travelerType: 'self'})}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all border ${
                    formData.travelerType === 'self' 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  ฉันเดินทางเอง
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, travelerType: 'other'})}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all border ${
                    formData.travelerType === 'other' 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  จองให้ผู้อื่น (พ่อ, แม่, ญาติ)
                </button>
              </div>
            </div>

            {/* ถ้าจองให้คนอื่น โชว์ฟอร์มนี้ */}
            {formData.travelerType === 'other' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">ชื่อผู้รับบริการ <span className="text-rose-500">*</span></label>
                  <input type="text" placeholder="คุณปรียา รักดูแล (ครูปรียา)" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={formData.travelerName} onChange={(e) => setFormData({...formData, travelerName: e.target.value})} required={formData.travelerType === 'other'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">อายุ (ปี) <span className="text-rose-500">*</span></label>
                  <input type="number" placeholder="65" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm" value={formData.travelerAge} onChange={(e) => setFormData({...formData, travelerAge: e.target.value})} required={formData.travelerType === 'other'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">เพศของผู้เดินทาง</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white" value={formData.travelerGender} onChange={(e) => setFormData({...formData, travelerGender: e.target.value})}>
                    <option>หญิง</option>
                    <option>ชาย</option>
                  </select>
                </div>
              </div>
            )}

            {/* ระดับการเคลื่อนไหว */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-700">ระดับการเคลื่อนไหว / สภาพร่างกาย</label>
                <span className="text-xs text-indigo-600 font-semibold">เพื่อให้ผู้ช่วยเตรียมพร้อม</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'normal', icon: '🚶', title: 'เดินคล่องปกติ', desc: 'ไม่ต้องใช้อุปกรณ์' },
                  { id: 'stick', icon: '🦯', title: 'เดินช้า / ไม้เท้า', desc: 'ต้องการช่วยพยุง' },
                  { id: 'wheelchair', icon: '♿', title: 'นั่งวีลแชร์', desc: 'ต้องช่วยเข็นรถ' },
                  { id: 'bedbound', icon: '🛏️', title: 'ดูแลใกล้ชิด', desc: 'ความช่วยเหลือพิเศษ' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({...formData, mobilityLevel: item.id})}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                      formData.mobilityLevel === item.id 
                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                        : 'bg-white border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-2xl mb-2">{item.icon}</span>
                    <span className="font-bold text-sm text-slate-900">{item.title}</span>
                    <span className="text-[10px] text-slate-500 mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ผู้ติดต่อฉุกเฉิน & ข้อมูลสุขภาพ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1"><span className="text-rose-500">🛡️</span> ชื่อผู้ติดต่อฉุกเฉิน</label>
                <input type="text" placeholder="เช่น คุณสมชาย (บุตร), คุณพัชรี (ญาติ)" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" value={formData.emergencyContactName} onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-1"><span className="text-emerald-500">📞</span> เบอร์โทรติดต่อฉุกเฉิน</label>
                <input type="tel" placeholder="081-234-5678" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-slate-50" value={formData.emergencyContactPhone} onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1"><span className="text-blue-500">⚕️</span> ข้อมูลสุขภาพเบื้องต้น / โรคประจำตัว / ยาที่ต้องพกติดตัว</label>
              <input type="text" placeholder="เช่น โรคเบาหวาน/ความดัน, ทานยาเรียบร้อยแล้ว, แพ้ยาเพนิซิลลิน" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-slate-50" value={formData.medicalNotes} onChange={(e) => setFormData({...formData, medicalNotes: e.target.value})} />
            </div>
          </section>

          {/* ================= 3. สถานที่ ================= */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold border border-rose-100">3</div>
              <h2 className="text-lg font-bold text-slate-900">สถานที่ต้นทางและจุดหมายปลายทาง</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                    <span className="text-rose-500">📍</span> สถานที่ต้นทาง (จุดนัดพบ) <span className="text-rose-500">*</span>
                  </label>
                  
                </div>
                <input type="text" placeholder="เช่น คอนโดเดอะเบส พหลโยธิน" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" value={formData.pickupLocation} onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})} required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block mb-3">สถานที่ปลายทาง (จุดทำธุระ) <span className="text-rose-500">*</span></label>
                <input type="text" placeholder="เช่น โรงพยาบาลรามาธิบดี, ธนาคารกรุงเทพ" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none bg-slate-50" value={formData.dropoffLocation} onChange={(e) => setFormData({...formData, dropoffLocation: e.target.value})} required />
              </div>
            </div>
          </section>

          {/* ================= 4. วันเวลา ================= */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">4</div>
              <h2 className="text-lg font-bold text-slate-900">วัน เวลา และระยะเวลาที่ต้องการใช้บริการ</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">วันนัดหมาย <span className="text-rose-500">*</span></label>
                <input type="date" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 outline-none" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">เวลานัดพบ <span className="text-rose-500">*</span></label>
                <input type="time" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 outline-none" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ระยะเวลาโดยประมาณ (ชั่วโมง) <span className="text-rose-500">*</span></label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white focus:border-indigo-500 outline-none" value={formData.durationHours} onChange={(e) => setFormData({...formData, durationHours: e.target.value})}>
                  <option value="1">1 ชั่วโมง</option>
                  <option value="1.5">1.5 ชั่วโมง</option>
                  <option value="2">2 ชั่วโมง</option>
                  <option value="2.5">2.5 ชั่วโมง</option>
                  <option value="3">3 ชั่วโมง</option>
                </select>
              </div>
            </div>
          </section>

          {/* ================= 5. สรุปค่าใช้จ่าย ================= */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100">5</div>
              <h2 className="text-lg font-bold text-slate-900">ผู้ร่วมเดินทางที่เลือก (Companion)</h2>
            </div>

            <div className="space-y-2 mb-8">
              <label className="text-sm font-bold text-slate-700">ความต้องการพิเศษ / ข้อมูลที่อยากเน้นย้ำ</label>
              <input type="text" placeholder="เช่น มีรถเข็นส่วนตัว, เดินช้า, มีสัมภาระ 2 ชิ้น" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50" value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} />
            </div>

            <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm font-bold text-blue-700 mb-1">ประมาณการค่าบริการ</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-blue-700">฿{estimatedTotal}</span>
                </div>
                <p className="text-xs text-blue-500 mt-1 font-medium">คำนวณจาก {formData.durationHours} ชั่วโมง x ฿{companionRate}/ชม.</p>
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto bg-[#2563eb] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                ยืนยันและส่งคำขอร่วมเดินทาง
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </section>

        </form>
      </main>
    </div>
  )
}