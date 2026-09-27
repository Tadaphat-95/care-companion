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
        get(name: string) {
          return request.cookies.get(name)?.value
        },
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

  // กำหนดหน้าที่ Guest เข้าได้
  // (อนุญาตให้เข้าหน้าแรก, หน้ารวม Companion และ API auth)
  const isPublicRoute = currentPath === '/' || currentPath.startsWith('/companions') || currentPath.startsWith('/auth')

  // 🛡️ กฎ 1: ยังไม่ Login แต่ดันแอบเข้าหน้าส่วนตัว -> เตะไปหน้าล็อกอิน
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 🛡️ กฎ 2: Login แล้ว ต้องเช็ค Role ว่าเป็นใคร
  if (user) {
    // แวะไปดึง Role จาก Database มาก่อน
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    // ถ้าดึงไม่ได้ หรือยังไม่ตั้งค่า ให้ default เป็น customer ไปก่อนกันแอปพัง
    const role = userData?.role || 'customer' 

    // 2.1 ถ้าอยู่หน้า Login (/) ให้ส่งไป Dashboard ของตัวเองโดยอัตโนมัติ
    if (currentPath === '/') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }

    // 2.2 ถ้าพยายามข้ามเส้น (Customer เข้าหน้า Companion หรือสลับกัน) -> เตะกลับบ้าน!
    if (currentPath.startsWith('/customer') && role !== 'customer') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
    if (currentPath.startsWith('/companion') && role !== 'companion') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
    // เผื่อ Admin ไว้เลย ล็อกเป้าให้เนียนๆ
    if (currentPath.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match routes ทั้งหมดยกเว้น:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - รูปภาพต่างๆ
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}