// components/AuthForm.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (action: 'login' | 'signup') => {
    setIsLoading(true)
    setError(null)

    try {
      if (action === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        alert('สมัครสมาชิกสำเร็จ! กรุณาล็อกอิน')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        
        // ล็อกอินเสร็จ รีเฟรชหน้าต่างเพื่อให้ Server ดึง Session ใหม่
        router.refresh() 
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-center text-gray-800">เข้าสู่ระบบ / สมัครสมาชิก</h2>
      
      {error && (
        <div className="rounded bg-red-50 p-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <input
          type="email"
          placeholder="อีเมลของคุณ"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน (ขั้นต่ำ 6 ตัวอักษร)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-black focus:outline-none"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => handleAuth('login')}
          disabled={isLoading}
          className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isLoading ? 'รอแป๊บ...' : 'เข้าสู่ระบบ'}
        </button>
        <button
          onClick={() => handleAuth('signup')}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:opacity-50"
        >
          สมัครสมาชิก
        </button>
      </div>
    </div>
  )
}