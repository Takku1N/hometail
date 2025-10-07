"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import PetCard from "@/components/PetCard";
import { demoPets } from "@/lib/petsData";

export default function Home() {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return demoPets;
    return demoPets.filter((p) =>
      [p.name, p.breed, p.location].some((t) => t.toLowerCase().includes(term))
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar onSearchChange={setSearch} />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </main>
  );
}
