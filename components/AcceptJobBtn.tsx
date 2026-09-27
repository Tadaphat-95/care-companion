// components/AcceptJobBtn.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AcceptJobBtn({ requestId, companionId }: { requestId: string, companionId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAccept = async () => {
    setIsLoading(true)
    
    // อัปเดตสถานะเป็น accepted และใส่ ID ของคนรับงานลงไป
    const { error } = await supabase
      .from('requests')
      .update({ 
        status: 'accepted',
        companion_id: companionId 
      })
      .eq('id', requestId)

    setIsLoading(false)

    if (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message)
    } else {
      router.refresh() // รีเฟรชหน้าเพื่อดึงข้อมูลใหม่
    }
  }

  return (
    <button 
      onClick={handleAccept} 
      disabled={isLoading}
      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
    >
      {isLoading ? 'กำลังล็อกคิว...' : 'รับงานนี้ 🤝'}
    </button>
  )
}