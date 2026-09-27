import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SignOutBtn from '@/components/SignOutBtn'
import CreateRequestForm from '@/components/CreateRequestForm'

export default async function CustomerDashboard() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  const { data: requests } = await supabase
    .from('requests')
    .select('*')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Dashboard</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          <SignOutBtn />
        </header>

        <CreateRequestForm customerId={user.id} />

        <main className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4">ประวัติการจ้างงานของคุณ</h2>
          
          {!requests || requests.length === 0 ? (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-400">ยังไม่มีการจ้างงาน</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req: any) => (
                <div key={req.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">{req.title}</h4>
                    <p className="text-sm text-gray-500">{req.start_location} ➔ {req.destination}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(req.start_time).toLocaleString('th-TH')} | {req.duration_hours} ชม.
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    req.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                    req.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {req.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}