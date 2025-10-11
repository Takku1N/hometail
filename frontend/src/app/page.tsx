"use client";

import React, { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PetCard from "@/components/PetCard";

import fetchData from './fetchData'

interface PetProfile {
  pet_id: number;          // รหัสสัตว์เลี้ยง
  name: string;            // ชื่อ
  age: number;             // อายุ
  gender: string;          // เพศ (boy/girl)
  description: string;     // คำอธิบาย
  breed: string;           // สายพันธุ์
  location: string;        // สถานที่
  vaccinated: boolean;     // วัคซีนแล้วหรือยัง
  neutered: boolean;       // ทำหมันหรือยัง
  medical_note: string;    // หมายเหตุทางการแพทย์
  species: string;         // ประเภทสัตว์ (Dog/Cat)
  adopted: boolean;        // รับเลี้ยงแล้วหรือยัง
  image_url: string
  pet: Pet
}

interface Pet {
  id: number
  owner_id: number
}


export default function Home() {

  useEffect(() => {

    const fetchPet = async () => {
      const pets = await fetchData("/pet")
      setAllPet(pets)
    }
    fetchPet()
  }, [])


  const [search, setSearch] = useState("");
  const [allPet, setAllPet] = useState<PetProfile[]>([])
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allPet;
      return allPet.filter((p) =>
      [p.name, p.breed, p.location].some((t) => t.toLowerCase().includes(term))
    );

    
  }, [search, allPet]);


  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar onSearchChange={setSearch} />
      {/* {JSON.stringify(allPet)} */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((pet) => (
            <PetCard key={pet.pet_id} pet={pet}/>  
          ))}
        </div>
      </div>
    </main>
  );
}
