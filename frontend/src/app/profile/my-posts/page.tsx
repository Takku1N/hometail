"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function MyPostsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">My Posts</h1>
          <Link href="/profile/my-posts/create" className="flex items-center gap-2 rounded-full bg-green-200 hover:bg-green-300 text-gray-900 px-4 py-2 shadow">
            <span>➕</span>
            <span>create</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-4 flex items-center gap-3">
          <Chip active>ALL</Chip>
          <Chip>Available</Chip>
          <Chip>Adopted</Chip>
        </div>

        {/* Post cards */}
        <div className="mt-6 space-y-6">
          <PostCard
            image="/images/husky.jpg"
            title="iQ"
            subtitle="2 ขวบ • เพศผู้ • Beagle"
            location="กรุงเทพ"
            desc="ขี้เล่น ร่าเริง ชอบวิ่งเล่น เข้ากับคนง่าย"
            badge="Open for Adoption"
            interested={25}
            dimmed={false}
          />

          <PostCard
            image="/images/hometail_icon.png"
            title="Lukplub"
            subtitle="4 ขวบ • เพศผู้ • Siberian Husky"
            location="กรุงเทพ"
            desc="ขี้เล่น ดื้อบ้างเล็กน้อย แต่รักเจ้าของ"
            badge="Adopted"
            interested={12}
            dimmed
          />
        </div>
      </div>
    </main>
  );
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`${active ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-700"} rounded-full px-3 py-1 text-sm font-semibold`}
    >
      {children}
    </span>
  );
}

function PostCard({
  image,
  title,
  subtitle,
  location,
  desc,
  badge,
  interested,
  dimmed,
}: {
  image: string;
  title: string;
  subtitle: string;
  location: string;
  desc: string;
  badge: string;
  interested: number;
  dimmed?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-2xl bg-white shadow border overflow-hidden flex items-stretch ${dimmed ? "opacity-60" : ""}`}
    >
      <div className="relative w-[260px] h-[180px] md:w-[300px] md:h-[200px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1 p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="text-green-600 text-sm font-semibold">{badge}</div>
          <div className="text-xs text-gray-600">{interested} Interested</div>
        </div>
        <h3 className="mt-1 text-xl font-extrabold">🐶 {title}</h3>
        <div className="text-sm text-gray-800">{subtitle}</div>
        <div className="text-sm text-gray-700 mt-1">📍 {location}</div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>

        <div className="mt-3 flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full bg-green-200 px-4 py-2 text-gray-900">
            <span>✏️</span>
            <span>Edit</span>
          </button>
          <button className="rounded-full bg-red-200 px-4 py-2 text-gray-900">Delete</button>
        </div>
      </div>
    </div>
  );
}



