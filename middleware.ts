// middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
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

  // 1. หน้าที่ Guest เข้าได้ (ใช้ RegExp เช็คให้คลุมถึง sub-path ด้วย)
  const isPublicRoute = 
    currentPath === '/' || 
    currentPath.startsWith('/companions') || // คลุมทั้ง /companions และ /companions/[id]
    currentPath.startsWith('/auth')

  // 🛡️ กฎที่ 1: ถ้าเป็น Guest แล้วพยายามเข้าหน้าส่วนตัว -> เตะไปหน้าแรก
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

    // ถ้า Login แล้ว แต่อยู่หน้าแรก (/) ให้เด้งเข้า Dashboard อัตโนมัติ
    if (currentPath === '/') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }

    // ดักทางคนข้ามเส้น
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