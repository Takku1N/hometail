import { NextResponse } from "next/server";

const protectedRoutes = ["/"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("Middleware เริ่มทำงาน:", pathname);

  if (!protectedRoutes.some((path) => pathname.startsWith(path))) {
    console.log("Path ไม่ใช่ protected → ผ่าน");
    return NextResponse.next();
  }

  try {
    console.log("เช็ก login กับ backend...");
    const base_api = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${base_api}/myprofile`, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    console.log("Response status:", response.status);

    const data = await response.json();
    // console.log("Data จาก backend:", data);

    const isLogin = data.isLogin;

    if (!isLogin) {
      console.log("ยังไม่ได้ login → redirect /auth");
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // ตรวจสถานะ user ว่า Approve มั้ย
    if (!data.userData.status) {
      console.log("ยังไม่ Approve → redirect /auth");
      return NextResponse.redirect(new URL("/auth", req.url))
    }

    // Check for Admin role on profile pages
    if (pathname.startsWith('/profile') && data.userData?.role === 'Admin') {
      console.log("Admin user on /profile → redirecting to /admin");
      return NextResponse.redirect(new URL('/admin/users', req.url));
    }

    console.log("Login แล้ว ผ่าน middleware ได้");

    return NextResponse.next();
  } catch (error) {
    console.log("Middleware error:", error.message);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/", "/profile/:path*", "/about-us/:path*", "/donate/:path*", "/admin/:path*", "/pets/:path*"],
};


