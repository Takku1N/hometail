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
    const base_api = process.env.SERVER_SIDE_API_URL;

    const response = await fetch(`${base_api}/auth/myprofile`, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
      credentials: "include",
    });

    const data = await response.json();
    // console.log("Data จาก backend:", data);

    const isLogin = data.isLogin;
    console.log(isLogin)

    if (!isLogin) {
      console.log("ยังไม่ได้ login → redirect /auth");
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // ตรวจสถานะ user ว่า Approve มั้ย
    if (!data.userData.status) {
      console.log("ยังไม่ Approve → redirect /auth");
      return NextResponse.redirect(new URL("/auth", req.url))
    }

    // กัน user เข้าหน้า admin
    if (pathname.startsWith('/admin') && data.userData?.role === "User") {
      console.log("Admin user on /admin → redirecting to /");
      return NextResponse.redirect(new URL('/', req.url));
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
