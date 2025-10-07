"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

type Status = "Approved" | "Rejected" | "Pending";

export default function MyRequestsPage() {
  const requests: Array<{
    id: string;
    image: string;
    title: string;
    subtitle: string;
    owner: string;
    status: Status;
  }> = [
    {
      id: "iq",
      image: "/images/husky.jpg",
      title: "iQ",
      subtitle: "2 ขวบ • เพศผู้ • Beagle",
      owner: "@banana",
      status: "Approved",
    },
    {
      id: "mochi",
      image: "/images/hometail_signin.png",
      title: "Mochi",
      subtitle: "10 เดือน • เพศเมีย • CatThaiBaann",
      owner: "@ink",
      status: "Pending",
    },
    {
      id: "lukplub",
      image: "/images/hometail_icon.png",
      title: "Lukplub",
      subtitle: "4 ขวบ • เพศผู้ • Siberian Husky",
      owner: "@mike",
      status: "Rejected",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">My Requests</h1>
        <p className="text-gray-700 mt-2">ติดตามคำขอรับเลี้ยงของคุณได้ที่นี่</p>

        {/* Filters */}
        <div className="mt-4 flex items-center gap-3">
          <Chip active>All</Chip>
          <Chip>Approved</Chip>
          <Chip>Pending</Chip>
          <Chip>Rejected</Chip>
        </div>

        <div className="mt-6 space-y-6">
          {requests.map((r) => (
            <RequestCard key={r.id} {...r} />
          ))}
        </div>
      </div>
    </main>
  );
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`${active ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-700"} rounded-full px-3 py-1 text-sm font-semibold`}>
      {children}
    </span>
  );
}

function statusStyles(status: Status) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
  }
}

function RequestCard({ image, title, subtitle, owner, status }: { image: string; title: string; subtitle: string; owner: string; status: Status }) {
  return (
    <div className="w-full rounded-2xl bg-white shadow border overflow-hidden flex items-stretch">
      <div className="relative w-[220px] h-[150px] md:w-[260px] md:h-[170px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1 p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(status)}`}>{status}</div>
          <div className="text-xs text-gray-600">Adopted by {owner}</div>
        </div>
        <h3 className="mt-2 text-xl font-extrabold">🐶 {title}</h3>
        <div className="text-sm text-gray-800">{subtitle}</div>
      </div>
    </div>
  );
}



