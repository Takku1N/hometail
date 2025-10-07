"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function EditProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/profile");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl bg-white shadow p-6 md:p-10">
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border shadow">
                <Image src="/images/hometail_signin.png" alt="avatar" fill className="object-cover" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button type="button" className="rounded-lg bg-pink-100 hover:bg-pink-200 px-4 py-2 text-sm">Change picture</button>
                <button type="button" className="rounded-lg bg-red-200 hover:bg-red-300 px-4 py-2 text-sm">Delete picture</button>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="First Name" required>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Name"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Surname"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Email" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
              </div>

              <Field label="Address" required>
                <textarea
                  rows={5}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full rounded-xl border border-green-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                />
              </Field>

              <div className="flex items-center justify-end gap-4 pt-2">
                <button type="button" onClick={() => router.back()} className="rounded-lg bg-gray-100 hover:bg-gray-200 px-5 py-2">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-green-300 hover:bg-green-400 px-5 py-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-2 text-gray-700">{label} {required && <span className="text-red-500">*</span>}</span>
      {children}
    </label>
  );
}


