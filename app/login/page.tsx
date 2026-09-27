"use client";
import { useState } from "react";
// อิมพอร์ตตัว client ของเราเข้ามา
import { createClient } from "@/utils/supabase/client"; 

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // ยิงคำขอ Login ด้วย Google
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo: `${window.location.origin}/auth/callback` 
      },
    });

    if (error) {
      console.error("Login failed:", error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg-warm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-[500px] p-8 md:p-12 border-2 border-gray-100">
        
        <div className="w-20 h-20 bg-primary-soft text-primary rounded-full flex items-center justify-center mb-8 mx-auto">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-text-main mb-4">
          Care Companion
        </h1>
        <p className="text-xl text-center text-gray-600 mb-10">
          ผู้ช่วยเดินทางที่พร้อมดูแลคุณ<br/>เหมือนคนในครอบครัว
        </p>
        
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-4 bg-primary text-white font-bold text-xl py-5 rounded-2xl hover:bg-blue-800 transition-colors shadow-lg active:scale-95 disabled:opacity-50"
        >
          <div className="bg-white rounded-full p-1.5">
            <svg width="24" height="24" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
          </div>
          {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบด้วย Google"} 
        </button>
      </div>
    </div>
  );
}