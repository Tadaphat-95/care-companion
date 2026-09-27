import Link from 'next/link'
import AuthForm from '@/components/AuthForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 font-sans">
      
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900">Care Companion <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">TH</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#services" className="hover:text-indigo-600 transition-colors">ประเภทธุระ</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">ขั้นตอนการใช้งาน</a>
          <Link href="/companions" className="rounded-full bg-indigo-600 px-6 py-2.5 text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
            ค้นหาผู้ช่วย
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <div 
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 z-10 bg-white/75 backdrop-blur-sm" /> 
        
        <div className="relative z-20 max-w-3xl space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            เพื่อนร่วมทางที่คุณไว้วางใจ <br/>
            <span className="text-indigo-600">อุ่นใจทุกก้าวที่ไปทำธุระ</span>
          </h1>
          <p className="text-lg text-slate-700 md:px-12">
            บริการผู้ช่วยร่วมเดินทางสำหรับผู้สูงอายุและผู้ที่เดินทางคนเดียวไม่สะดวก ช่วยดูแลอำนวยความสะดวกในการไปพบแพทย์ ทำธุรกรรมธนาคาร ติดต่อราชการ ซื้อของ หรือทำธุระทั่วไป
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/companions" 
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              ค้นหาผู้ช่วย
            </Link>
            <a 
              href="#auth-section"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white border border-slate-300 px-8 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              เข้าสู่ระบบ / สมัครสมาชิก
            </a>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900">ประเภทธุระที่ให้บริการร่วมเดินทาง</h2>
          <p className="text-slate-500">เลือกประเภทธุระที่คุณต้องการความช่วยเหลือ ผู้ช่วยของเราพร้อมดูแลอำนวยความสะดวกตลอดเส้นทาง</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { category: 'โรงพยาบาล', tag: 'ยอดนิยมสูงสุด', tagColor: 'bg-rose-50 text-rose-600', iconColor: 'bg-rose-50 text-rose-500', title: 'พบแพทย์ / ไปโรงพยาบาล', desc: 'พาไปตรวจตามนัด ช่วยติดต่อเคาน์เตอร์ พยุงเดิน รอรับยา และพาเดินทางกลับบ้านอย่างปลอดภัย', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
            { category: 'ธนาคาร', tag: 'ปลอดภัย & เป็นส่วนตัว', tagColor: 'bg-blue-50 text-blue-600', iconColor: 'bg-blue-50 text-blue-500', title: 'ติดต่อธนาคาร / การเงิน', desc: 'ช่วยพาไปกดเงิน ทำธุรกรรมที่สาขา อำนวยความสะดวกเรื่องการเดินและถือสัมภาระ', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
            { category: 'ราชการ', tag: 'ช่วยเหลือด้านเอกสาร', tagColor: 'bg-amber-50 text-amber-600', iconColor: 'bg-amber-50 text-amber-500', title: 'ติดต่อหน่วยงานราชการ', desc: 'พาไปทำบัตรประชาชน ต่ออายุเอกสาร ติดต่อสำนักงานเขต ประกันสังคม หรือยื่นเรื่องต่างๆ', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { category: 'ซื้อของ', tag: 'ผ่อนแรงถือของ', tagColor: 'bg-teal-50 text-teal-600', iconColor: 'bg-teal-50 text-teal-500', title: 'ซื้อสินค้า / จ่ายตลาด', desc: 'ช่วยถือถุงช้อปปิ้ง เข็นรถ ช่วยเลือกซื้อของใช้เข้าบ้าน หรือไปซูเปอร์มาร์เก็ต', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
            { category: 'ทั่วไป', tag: 'เพื่อนร่วมทางอุ่นใจ', tagColor: 'bg-purple-50 text-purple-600', iconColor: 'bg-purple-50 text-purple-500', title: 'ธุระทั่วไป', desc: 'ไปงานบุญ งานพิธี พบปะเพื่อนฝูง หรือทำธุระส่วนตัวทั่วไป ที่ต้องการเพื่อนร่วมทางดูแล', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' }
          ].map((service, idx) => (
            <div key={idx} className="group rounded-2xl bg-white p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all relative overflow-hidden">
              <span className={`absolute top-6 right-6 text-xs font-semibold px-3 py-1 rounded-full ${service.tagColor}`}>{service.tag}</span>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.iconColor}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon}></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">{service.desc}</p>
              
              {/* 🔥 อัปเดตลิงก์ตรงนี้ ให้ส่ง Parameter category ไปที่หน้าค้นหา */}
              <Link href={`/companions?category=${service.category}`} className="text-indigo-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                ค้นหาผู้ช่วยสำหรับธุระนี้ <span>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section id="how-it-works" className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">ขั้นตอนการใช้บริการ Care Companion</h2>
            <p className="text-slate-500">ออกแบบให้ใช้งานง่าย ทั้งสำหรับผู้สูงอายุและลูกหลานที่ต้องการจองแทน</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-indigo-50 z-0"></div>

            {[
              { num: '01', title: 'ระบุความต้องการธุระ', desc: 'เลือกประเภทธุระ วันที่ เวลา พร้อมปักหมุดจุดรับ-ส่งบนแผนที่ และระบุความต้องการพิเศษ เช่น รถเข็น หรือช่วยถือของ', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { num: '02', title: 'เลือก Companion ที่ตรงใจ', desc: 'ดูข้อมูลประวัติ ประสบการณ์ พื้นที่ให้บริการ เรตติ้งรีวิว และอัตราค่าบริการ เพื่อเลือกคนที่เหมาะสมที่สุด', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { num: '03', title: 'ยืนยันและนัดหมาย', desc: 'Companion ตรวจสอบรายละเอียดและกดตอบรับงาน ระบบแสดงข้อมูลติดต่อฉุกเฉินพร้อมให้นัดพบตรงเวลา', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { num: '04', title: 'เดินทางปลอดภัย & รีวิว', desc: 'ติดตามสถานะการเดินทางแบบเรียลไทม์จนจบภารกิจ พร้อมให้คะแนนและรีวิวเพื่อรักษามาตรฐานชุมชน', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col items-start hover:-translate-y-1 hover:shadow-lg hover:border-indigo-100 transition-all">
                <div className="flex justify-between items-center w-full mb-6">
                  <span className="text-4xl font-extrabold text-indigo-600 opacity-20">{step.num}</span>
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon}></path></svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LOGIN SECTION ================= */}
      <section id="auth-section" className="py-24 px-4 bg-slate-50 flex justify-center border-t border-slate-200">
        <div className="w-full max-w-md">
          <AuthForm />
          <div className="mt-8 text-center">
            <div className="flex items-center w-full gap-4 text-slate-400 mb-4">
              <hr className="flex-1 border-slate-300" />
              <span className="text-sm">หรือ</span>
              <hr className="flex-1 border-slate-300" />
            </div>
            <Link href="/companions" className="text-sm font-medium text-slate-500 hover:text-indigo-600 underline underline-offset-4 transition-colors">
              เข้าชมในฐานะ Guest (ดูโปรไฟล์และราคา)
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-6 flex gap-4 items-start">
            <svg className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <div>
              <h4 className="font-bold text-amber-500 mb-1">ข้อควรทราบเกี่ยวกับขอบเขตการให้บริการ (Important Ethical & Safety Notice):</h4>
              <p className="text-amber-100/70 text-sm leading-relaxed">
                ผู้ให้บริการร่วมเดินทาง (Companion) บนแพลตฟอร์ม Care Companion มีหน้าที่ช่วยเหลือและอำนวยความสะดวกในการเดินทางและทำธุระทั่วไปเท่านั้น <span className="text-amber-400 font-bold underline decoration-amber-400/50 underline-offset-2">ไม่ใช่ผู้ให้บริการทางการแพทย์ หรือผู้ดูแลรักษาพยาบาลผู้ป่วย</span> กรณีผู้เดินทางมีอาการเจ็บป่วยฉุกเฉิน กรุณาติดต่อสายด่วน 1669 ทันที
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <span className="text-xl font-extrabold text-white">Care Companion <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded">TH</span></span>
              </div>
              <p className="text-slate-400 text-sm">แพลตฟอร์มกลางเชื่อมโยงระหว่างผู้ที่ต้องการเพื่อนร่วมเดินทางสำหรับผู้สูงอายุและผู้ที่ต้องการความช่วยเหลือ กับผู้ช่วยร่วมเดินทางมืออาชีพที่ผ่านการตรวจสอบตัวตน อุ่นใจทุกก้าวที่ไปทำธุระ</p>
              <p className="text-indigo-400 font-semibold text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                ติดต่อสอบถามหรือประสานงานฉุกเฉิน: 02-XXX-XXXX
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">เมนูลัด</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/companions" className="hover:text-indigo-400 transition-colors">ค้นหาผู้ช่วย</Link></li>
                <li><a href="#services" className="hover:text-indigo-400 transition-colors">ประเภทธุระที่ให้บริการ</a></li>
                <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">ขั้นตอนการจองบริการ</a></li>
                <li><a href="#auth-section" className="hover:text-indigo-400 transition-colors">สมัครเป็นผู้ช่วยกับเรา</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">มาตรฐานความปลอดภัย</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2">• สแกนใบหน้าผู้ช่วย</li>
                <li className="flex items-center gap-2">• ปักหมุดระบุพิกัดจุดรับ-ส่งชัดเจน</li>
                <li className="flex items-center gap-2">• ระบบรีวิวและให้คะแนนดาวจริง</li>
                <li className="flex items-center gap-2">• ข้อมูลติดต่อฉุกเฉินสำหรับครอบครัว</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} Care Companion. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}