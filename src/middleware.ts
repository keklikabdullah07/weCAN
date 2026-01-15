import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "gizli-anahtar-123");

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Sadece /admin ile başlayan yolları kontrol et
  if (path.startsWith("/admin")) {
    
    // Çerezi al
    const token = request.cookies.get("admin_session")?.value;

    // Çerez yoksa -> Login'e at
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Çerez sahte mi? Süresi bitmiş mi? Kontrol et
      await jwtVerify(token, SECRET_KEY);
      // Her şey yolunda, geçebilirsin
      return NextResponse.next();
    } catch (error) {
      // Çerez geçersiz -> Login'e at
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Admin dışındaki sayfalara karışma
  return NextResponse.next();
}

// Hangi yollarda çalışacağını belirt
export const config = {
  matcher: ["/admin/:path*"],
};