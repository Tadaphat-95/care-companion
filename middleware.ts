// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const currentPath = request.nextUrl.pathname

  // 🔥 อัปเดต: เพิ่ม currentPath.startsWith('/book') เข้าไปให้ Guest เข้าหน้าจองได้
  const isPublicRoute = 
    currentPath === '/' || 
    currentPath.startsWith('/companions') || 
    currentPath.startsWith('/auth') ||
    currentPath.startsWith('/book')

  // 🛡️ กฎที่ 1: ถ้าเป็น Guest แล้วเข้าหน้าส่วนตัว -> เตะไปหน้าแรก
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 🛡️ กฎที่ 2: ถ้า Login แล้ว
  if (user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = userData?.role || 'customer' 

    if (currentPath === '/') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }

    const isCustomerDashboard = currentPath.startsWith('/customer')
    const isCompanionDashboard = currentPath.startsWith('/companion') && !currentPath.startsWith('/companions')
    const isAdminDashboard = currentPath.startsWith('/admin')

    if (isCustomerDashboard && role !== 'customer') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
    if (isCompanionDashboard && role !== 'companion') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
    if (isAdminDashboard && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}