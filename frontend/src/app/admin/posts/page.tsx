"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type PostStatus = "Approved" | "Rejected" | "Pending";

interface AdminPost {
  id: string;
  petName: string;
  owner: string;
  species: "Dog" | "Cat";
  status: PostStatus;
}

export default function AdminPostsPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | PostStatus>("ALL");
  const [speciesFilter, setSpeciesFilter] = useState<"ALL" | "Dog" | "Cat">("ALL");

  const [posts, setPosts] = useState<AdminPost[]>([
    { id: "1", petName: "Buddy", owner: "Sarah Miller", species: "Dog", status: "Pending" },
    { id: "2", petName: "Whiskers", owner: "David Lee", species: "Cat", status: "Approved" },
    { id: "3", petName: "Max", owner: "Emily Chen", species: "Dog", status: "Rejected" },
    { id: "4", petName: "Snowball", owner: "Michael Brown", species: "Cat", status: "Pending" },
    { id: "5", petName: "Coco", owner: "Jessica Wong", species: "Dog", status: "Approved" },
  ]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const mq = `${p.petName} ${p.owner}`.toLowerCase().includes(query.toLowerCase());
      const ms = statusFilter === "ALL" ? true : p.status === statusFilter;
      const sp = speciesFilter === "ALL" ? true : p.species === speciesFilter;
      return mq && ms && sp;
    });
  }, [posts, query, statusFilter, speciesFilter]);

  function setStatus(id: string, status: PostStatus) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <main className="min-h-screen flex" style={{ backgroundColor: "#F1CCD4" }}>
      {/* Sidebar */}
      <aside className="w-[320px] bg-white h-screen sticky top-0 p-6 flex flex-col justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold">HomeTail Admin</h1>
          <nav className="mt-6 space-y-2">
            <Link href="/admin/users" className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-pink-50">
              <span>👥</span>
              <span className="font-semibold">Users</span>
            </Link>
            <Link href="/admin/posts" className="flex items-center gap-3 rounded-xl bg-pink-100 px-4 py-3 transition-colors hover:bg-pink-200">
              <span>🖼️</span>
              <span className="font-semibold">Posts</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 px-2">
          <Image src="/images/hometail_signin.png" alt="admin" width={40} height={40} className="rounded-full" />
          <div>
            <div className="font-semibold">Admin</div>
            <div className="text-sm text-gray-600">admin@hometail.com</div>
          </div>
        </div>
      </aside>

      {/* Content card */}
      <section className="flex-1 p-8">
        <div className="mx-auto max-w-7xl rounded-3xl p-8 md:p-10 border border-pink-200" style={{ backgroundColor: "#F8DDE3" }}>
          <h2 className="text-4xl font-extrabold">Post Management</h2>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pet name or owner"
                className="w-80 rounded-full border border-pink-200 bg-white px-4 py-2 pl-9 shadow-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="rounded-full border border-pink-200 bg-white px-4 py-2 shadow-sm">
              <option>ALL</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value as any)} className="rounded-full border border-pink-200 bg-white px-4 py-2 shadow-sm">
              <option>ALL</option>
              <option>Dog</option>
              <option>Cat</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-pink-200 bg-white/60">
            <table className="min-w-full text-left text-sm">
              <thead style={{ backgroundColor: "#F9E6EA" }}>
                <tr>
                  <th className="px-4 py-3">Pet Name</th>
                  <th className="px-4 py-3">Owner</th>
                  <th className="px-4 py-3">Species</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="odd:bg-white even:bg-pink-50/40">
                    <td className="px-4 py-3">{p.petName}</td>
                    <td className="px-4 py-3 font-semibold">{p.owner}</td>
                    <td className="px-4 py-3">{p.species}</td>
                    <td className="px-4 py-3">
                      {p.status === "Approved" && <span className="text-blue-600">Approved</span>}
                      {p.status === "Pending" && <span className="text-green-600">Pending</span>}
                      {p.status === "Rejected" && <span className="text-red-600">Rejected</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-sm">
                        <button title="view" className="hover:opacity-70">👁️</button>
                        <button title="delete" className="hover:opacity-70">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}


