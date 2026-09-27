'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function CreateRequestForm({ customerId }: { customerId: string }) {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    errand_type: 'พาไปโรงพยาบาล',
    start_location: '',
    destination: '',
    start_time: '',
    duration_hours: 1
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase
      .from('requests')
      .insert({
        customer_id: customerId,
        title: formData.title,
        errand_type: formData.errand_type,
        start_location: formData.start_location,
        destination: formData.destination,
        start_time: new Date(formData.start_time).toISOString(),
        duration_hours: Number(formData.duration_hours),
        status: 'pending'
      })

    setIsLoading(false)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      setFormData({
        title: '',
        errand_type: 'พาไปโรงพยาบาล',
        start_location: '',
        destination: '',
        start_time: '',
        duration_hours: 1
      })
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <h3 className="font-bold text-lg text-gray-900">สร้างคำขอจ้างงานใหม่</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">หัวข้องาน</label>
          <input required name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="เช่น พาคุณแม่ไปตรวจสุขภาพ" />
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">ประเภทธุระ</label>
          <select name="errand_type" value={formData.errand_type} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm">
            <option>พาไปโรงพยาบาล</option>
            <option>ติดต่อหน่วยงานราชการ</option>
            <option>พาไปธนาคาร</option>
            <option>ซื้อของ/ช้อปปิ้ง</option>
            <option>อื่นๆ</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">จุดรับ (ต้นทาง)</label>
          <input required name="start_location" value={formData.start_location} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="เช่น บ้านเลขที่..." />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">จุดหมาย (ปลายทาง)</label>
          <input required name="destination" value={formData.destination} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" placeholder="เช่น รพ.ศิริราช" />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">วันและเวลานัดหมาย</label>
          <input required type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">ระยะเวลาที่คาดไว้ (ชั่วโมง)</label>
          <input required type="number" min="1" max="12" name="duration_hours" value={formData.duration_hours} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm" />
        </div>
      </div>

      <button disabled={isLoading} type="submit" className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-50">
        {isLoading ? 'กำลังส่งข้อมูล...' : 'โพสต์หาผู้ช่วยเดินทาง'}
      </button>
    </form>
  )
}