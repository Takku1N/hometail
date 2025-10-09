"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type UserStatus = "Active" | "Pending";

interface AdminUser {
  id: string;
  name: string;
  role: "Owner" | "Adopter";
  email: string;
  joinDate: string;
  status: UserStatus;
}

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | UserStatus>("ALL");

  const [users, setUsers] = useState<AdminUser[]>([
    { id: "1", name: "Sophia Carter", role: "Owner", email: "sophia.carter@email.com", joinDate: "2023-01-15", status: "Active" },
    { id: "2", name: "Ethan Bennett", role: "Adopter", email: "ethan.bennett@email.com", joinDate: "2022-11-20", status: "Active" },
    { id: "3", name: "Olivia Hayes", role: "Owner", email: "olivia.hayes@email.com", joinDate: "2023-03-05", status: "Pending" },
    { id: "4", name: "Liam Foster", role: "Adopter", email: "liam.foster@email.com", joinDate: "2022-09-10", status: "Active" },
    { id: "5", name: "Ava Morgan", role: "Owner", email: "ava.morgan@email.com", joinDate: "2023-05-22", status: "Active" },
  ]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQuery = `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "ALL" ? true : u.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [users, query, statusFilter]);

  function approve(id: string) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: "Active" } : u)));
  }
  function reject(id: string) {
    // For Pending users, reject = delete user request
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }
  function deleteUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <main className="min-h-screen flex" style={{ backgroundColor: "#F1CCD4" }}>
      {/* Sidebar */}
      <aside className="w-[320px] bg-white h-screen sticky top-0 p-6 flex flex-col justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold">HomeTail Admin</h1>
          <nav className="mt-6 space-y-2">
            <Link href="/admin/users" className="flex items-center gap-3 rounded-xl bg-pink-100 px-4 py-3 transition-colors hover:bg-pink-200">
              <span>👥</span>
              <span className="font-semibold">Users</span>
            </Link>
            <Link href="/admin/posts" className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-pink-50">
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
          <Link href="/auth" className="ml-auto text-xs text-gray-700 hover:underline">Sign out</Link>
        </div>
      </aside>

      {/* Content card */}
      <section className="flex-1 p-8">
        <div className="mx-auto max-w-7xl rounded-3xl p-8 md:p-10 border border-pink-200" style={{ backgroundColor: "#F8DDE3" }}>
          <h2 className="text-4xl font-extrabold">User Management</h2>

          {/* Toolbar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or email"
                className="w-80 rounded-full border border-pink-200 bg-white px-4 py-2 pl-9 shadow-sm"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">🔍</span>
            </div>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="rounded-full border border-pink-200 bg-white px-4 py-2 shadow-sm">
              <option>ALL</option>
              <option>Active</option>
              <option>Pending</option>
            </select>
            
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-pink-200 bg-white/60">
            <table className="min-w-full text-left text-sm">
              <thead className="" style={{ backgroundColor: "#F9E6EA" }}>
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Join Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="odd:bg-white even:bg-pink-50/40">
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.joinDate}</td>
                    <td className="px-4 py-3">
                      {u.status === "Active" && <span className="text-green-600">Active</span>}
                      {u.status === "Pending" && <span className="text-yellow-700">Pending</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {u.status === "Pending" ? (
                          <>
                            <button onClick={() => reject(u.id)} className="rounded-full bg-red-100 hover:bg-red-200 px-3 py-1 text-xs text-red-700">Reject</button>
                            <button onClick={() => approve(u.id)} className="rounded-full bg-green-200 hover:bg-green-300 px-3 py-1 text-xs text-green-900">Approve</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => deleteUser(u.id)} className="rounded-full bg-gray-200 hover:bg-gray-300 px-3 py-1 text-xs text-gray-800">Delete</button>
                          </>
                        )}
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


