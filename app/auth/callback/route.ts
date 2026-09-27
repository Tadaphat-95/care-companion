// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // ถ้ามีค่า next ใน URL ให้ redirect ไปหน้านั้น ถ้าไม่มีให้กลับไปหน้าแรก (/)
  const next = searchParams.get('next') ?? '/'

  if (code) {
    // 🔥 แก้ตรงนี้: ต้องใส่ await ก่อนเรียกใช้ cookies() ใน Next.js เวอร์ชันใหม่
    const cookieStore = await cookies() 

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // ดักจับ Error กรณีถูกเรียกจาก Server Component ที่แก้ไข Cookie ไม่ได้
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // ดักจับ Error กรณีถูกเรียกจาก Server Component
            }
          },
        },
      }
    )

    // นำ Code ที่ได้จาก URL ไปแลกเป็น Session จริงจาก Supabase
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') 
      const isLocalEnv = process.env.NODE_ENV === 'development'
      
      if (isLocalEnv) {
        // ทดสอบรันบนเครื่อง Local (localhost)
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        // รันบนเซิร์ฟเวอร์จริง (เช่น Vercel)
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // ถ้าแลก Code ไม่สำเร็จ (Error) จะเด้งกลับไปหน้าแรก หรือหน้าที่คุณเตรียมไว้แจ้งเตือน
  return NextResponse.redirect(`${origin}/?error=auth-code-error`)
}