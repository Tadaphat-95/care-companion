// components/RoleSwitcher.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RoleSwitcher() {
  const cookieStore = await cookies()
  // อ่านค่า role จาก cookie ทื่อๆ เลย ถ้าไม่มีให้เป็น guest
  const currentRole = cookieStore.get('mock_role')?.value || 'guest'
  
  const roleNameThai = 
    currentRole === 'admin' ? 'แอดมิน' : 
    currentRole === 'companion' ? 'ผู้รับงาน' : 
    currentRole === 'customer' ? 'ลูกค้า' : 'คนนอก (Guest)'

  // 🔥 ฟังก์ชันสลับ Role แบบไม่ต้องง้อ DB
  async function switchRole(formData: FormData) {
    'use server'
    const newRole = formData.get('role') as string
    
    // ยัดใส่ Cookie ดื้อๆ
    const cookieStore = await cookies()
    cookieStore.set('mock_role', newRole, { path: '/' })
    
    // เด้งไปหน้า Dashboard ของ Role นั้นๆ
    if (newRole === 'guest') {
      redirect('/')
    } else {
      redirect(`/${newRole}`)
    }
  }

  return (
    <div className="bg-slate-900 text-white px-6 py-2 flex items-center justify-between text-sm z-[9999] relative shadow-md">
      <div className="font-bold flex items-center gap-2">
        <span>⚡</span> 
        <span className="text-amber-400">God Mode:</span> 
        สถานะปัจจุบันคือ <span className="text-emerald-400">[{roleNameThai}]</span>
      </div>
      
      <form action={switchRole} className="flex gap-2">
        <button 
          name="role" 
          value="guest" 
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs transition-all ${currentRole === 'guest' ? 'bg-slate-100 text-slate-900 border-slate-100' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
        >
          👀 Guest (หน้าแรก)
        </button>
        <button 
          name="role" 
          value="customer" 
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs transition-all ${currentRole === 'customer' ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
        >
          👤 Customer
        </button>
        <button 
          name="role" 
          value="companion" 
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs transition-all ${currentRole === 'companion' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
        >
          🤝 Companion
        </button>
        <button 
          name="role" 
          value="admin" 
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border font-bold text-xs transition-all ${currentRole === 'admin' ? 'bg-purple-500 text-white border-purple-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
        >
          🛡️ Admin
        </button>
      </form>
    </div>
  )
}