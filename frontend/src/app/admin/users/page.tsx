"use client";

import fetchData from "@/app/fetchData";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { RoleInterface, UserInterface } from "@/interface"
import axios from "axios";

const base_api = process.env.NEXT_PUBLIC_API_URL;
type UserStatus = "Active" | "Pending";

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | UserStatus>("ALL");

  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUser = await fetchData('/user');
      setUsers(allUser);
    }

    fetchUsers();
    console.log(users)
  }, [])

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQuery = `${u.user_profile?.first_name || ""} ${u.user_profile?.last_name || ""} ${u.email}`.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "ALL" ? true : u.status === (statusFilter === "Active");
      const matchRole = u.role === "User"
      return matchQuery && matchStatus && matchRole;
    });
  }, [users, query, statusFilter]);

  async function approve (id: number) {
    try {
      const response = await axios.put(`${base_api}/user/unban/${id}`, {}, {withCredentials: true});
      console.log(response);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: true } : u)));
    } catch (err) {
      alert("Approve ไม่สำเร็จ")
      console.log(err)
    }
  }
  async function reject(id: number) {
    // For Pending users, reject = delete user request
    try {
      const response = await axios.put(`${base_api}/user/ban/${id}`, {}, {withCredentials: true});
      console.log(response);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: false } : u)));
    } catch (err) {
      alert("Reject ไม่สำเร็จ")
      console.log(err)
    }
  }
  async function deleteUser(id: number) {
    try {
      const response = await axios.delete(`${base_api}/user/${id}`, {withCredentials: true});
      console.log(response);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Delete user ไม่สำเร็จ")
      console.log(err)
    }
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
            <Link href="/admin/pets" className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-pink-50">
              <span>🖼️</span>
              <span className="font-semibold">Pets</span>
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

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as UserStatus)} className="rounded-full border border-pink-200 bg-white px-4 py-2 shadow-sm">
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
                    <td className="px-4 py-3">{u.user_profile?.first_name || ""} {u.user_profile?.last_name || ""}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.createdAt ? new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }).format(new Date(u.createdAt)) : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {u.status && <span className="text-green-600">Active</span>}
                      {u.status == false && <span className="text-yellow-700">Pending</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {u.status == false ? (
                          <>
                            <button onClick={() => deleteUser(u.id)} className="rounded-full bg-gray-200 hover:bg-gray-300 px-3 py-1 text-xs text-gray-800">Delete</button>
                            <button onClick={() => approve(u.id)} className="rounded-full bg-green-200 hover:bg-green-300 px-3 py-1 text-xs text-green-900">Approve</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => deleteUser(u.id)} className="rounded-full bg-gray-200 hover:bg-gray-300 px-3 py-1 text-xs text-gray-800">Delete</button>
                            <button onClick={() => reject(u.id)} className="rounded-full bg-red-100 hover:bg-red-200 px-3 py-1 text-xs text-red-700">Reject</button>
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


