"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { RequestStatusInterface, PetTypeInterface, PetProfileInterface, UserInterface } from "@/interface"
import fetchData from "@/app/fetchData";
import axios from "axios";
// import { title } from "process";

const base_api = process.env.NEXT_PUBLIC_API_URL;
type AdoptedType = "Adopted" | "Not Adopted"

export default function AdminPostsPage() {
  const [query, setQuery] = useState("");
  const [adoptedFilter, setAdoptedFilter] = useState<"ALL" | AdoptedType>("ALL");
  const [speciesFilter, setSpeciesFilter] = useState<"ALL" | PetTypeInterface>("ALL");

  const [pets, setPets] = useState<PetProfileInterface[]>([
    // { id: "1", petName: "Buddy", owner: "Sarah Miller", species: "Dog", status: "not-adopted" },
    // { id: "2", petName: "Whiskers", owner: "David Lee", species: "Cat", status: "adopted" },
    // { id: "3", petName: "Max", owner: "Emily Chen", species: "Dog", status: "not-adopted" },
    // { id: "4", petName: "Snowball", owner: "Michael Brown", species: "Cat", status: "not-adopted" },
    // { id: "5", petName: "Coco", owner: "Jessica Wong", species: "Dog", status: "adopted" },
  ]);

  useEffect(() => {
    const pets = async () => {
      const allPet = await fetchData('/pet');
      setPets(allPet)
    }

    pets();
    console.log(pets)
  }, [])

  const filtered = useMemo(() => {
    return pets.filter((p) => {
      const mq = `${p.name} ${p.pet.owner.user_profile?.first_name || ""} ${p.pet.owner.user_profile?.last_name || ""}`.toLowerCase().includes(query.toLowerCase());
      const ms = adoptedFilter === "ALL" ? true : p.adopted === (adoptedFilter === "Adopted");
      const sp = speciesFilter === "ALL" ? true : p.species === speciesFilter;
      return mq && ms && sp;
    });
  }, [pets, query, adoptedFilter, speciesFilter]);

  // async function setStatus(id: string, status: RequestStatusInterface) {
  //   pets((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  // }

  const deletePet = async (id: number) => {
    try {
      const response = await axios.delete(`${base_api}/pet/${id}`, {withCredentials: true});
      console.log(response);
      setPets((prev) => prev.filter((u) => u.pet.id !== id));
    } catch (err) {
      alert("Delete pet ไม่สำเร็จ")
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
            <Link href="/admin/users" className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-pink-50">
              <span>👥</span>
              <span className="font-semibold">Users</span>
            </Link>
            <Link href="/admin/pets" className="flex items-center gap-3 rounded-xl bg-pink-100 px-4 py-3 transition-colors hover:bg-pink-200">
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

            <select value={adoptedFilter} onChange={(e) => setAdoptedFilter(e.target.value as AdoptedType)} className="rounded-full border border-pink-200 bg-white px-4 py-2 shadow-sm">
              <option>ALL</option>
              <option>Adopted</option>
              <option>Not Adopted</option>
            </select>

            <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value as PetTypeInterface)} className="rounded-full border border-pink-200 bg-white px-4 py-2 shadow-sm">
              <option>ALL</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Hamster</option>
              <option>Lizard</option>
              <option>Rabbit</option>
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
                  <tr key={p.pet.id} className="odd:bg-white even:bg-pink-50/40">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3 font-semibold">{p.pet.owner.user_profile?.first_name || 'None'} {p.pet.owner.user_profile?.last_name || 'None'}</td>
                    <td className="px-4 py-3">{p.species}</td>
                    <td className="px-4 py-3">
                      {p.adopted && <span className="text-green-700">Adopted</span>}
                      {p.adopted == false && <span className="text-gray-700">Not Adopted</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Link href={`/pets/${p.pet.id}`} title="view" className="hover:opacity-70">
                        👁️
                        </Link>
                        <button title="delete" className="hover:opacity-70" onClick={() => {deletePet(p.pet.id)}}>🗑️</button>
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


