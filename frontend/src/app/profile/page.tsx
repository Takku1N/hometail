"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile card */}
          <div className="rounded-2xl bg-white shadow p-6">
            <div className="flex flex-col items-center text-center">
              <Image src="/images/hometail_signin.png" alt="avatar" width={120} height={120} className="rounded-full border" />
              <h2 className="mt-4 text-xl font-bold">ink waruntorn</h2>
              <span className="text-green-600 mt-1">Active</span>
              <Link href="/profile/edit" className="mt-4 inline-block rounded-lg bg-pink-100 hover:bg-pink-200 px-4 py-2">Edit Profile</Link>
            </div>
          </div>

          {/* About card */}
          <div className="rounded-2xl bg-white shadow p-6">
            <h3 className="text-xl font-bold mb-4">About</h3>
            <div className="divide-y">
              <Row label="Email" value="ink123@example.com" />
              <Row label="Phone" value="0911231456" />
              <Row label="Address" value="Bangkok ,TH" />
            </div>
          </div>

          {/* Buttons */}
          <Link href="/profile/my-posts" className="block rounded-2xl bg-white shadow p-5 text-lg font-semibold hover:bg-gray-50">My Posts</Link>
          <Link href="/profile/my-requests" className="block rounded-2xl bg-white shadow p-5 text-lg font-semibold hover:bg-gray-50">My Requests</Link>
        </div>

        {/* Right column */}
        <div className="rounded-2xl bg-white shadow p-6">
          <h3 className="text-2xl font-extrabold">My Adoption Requests</h3>
          <p className="text-green-600">Track your adoption requests and their status</p>
          <hr className="my-4" />

          {/* Sample request card */}
          <div className="rounded-xl border bg-white p-3 flex items-center gap-4 shadow-sm w-full">
            <div className="relative w-28 h-20 rounded-lg overflow-hidden">
              <Image src="/images/husky.jpg" alt="iQ" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-bold">🐶 iQ</div>
              <div className="text-sm text-gray-700">2 ขวบ • เพศผู้ • Beagle</div>
              <div className="text-xs text-gray-500 mt-1">Adopted by @banana</div>
            </div>
            <button className="rounded-md bg-pink-100 px-3 py-1 text-sm">Reject</button>
            <button className="rounded-md bg-green-200 px-3 py-1 text-sm">Accept</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}


