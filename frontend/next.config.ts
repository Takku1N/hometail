import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
};

// dev ไม่ต้องใช้ standalone
if (process.env.NODE_ENV === "production") {
  nextConfig.output = "standalone";
}

export default nextConfig;
