// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname
  // อ่านค่า role จาก cookie
  const role = request.cookies.get('mock_role')?.value || 'guest'

  // อนุญาตให้หน้าพวกนี้เข้าได้อิสระ
  const isPublicRoute = 
    currentPath === '/' || 
    currentPath.startsWith('/companions') || 
    currentPath.startsWith('/book') ||
    currentPath.startsWith('/auth')

  // ถ้าเป็นหน้าลับ แต่ role ไม่ตรง ให้เตะกลับไปหน้าแรก
  if (currentPath.startsWith('/customer') && role !== 'customer') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // ระวัง path /companions (มี s) อย่าให้สับสนกับ /companion
  if (currentPath.startsWith('/companion') && !currentPath.startsWith('/companions') && role !== 'companion') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  if (currentPath.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ปล่อยผ่านปกติ
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}