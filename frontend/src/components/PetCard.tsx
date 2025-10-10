import Image from "next/image";
import Link from "next/link";
import React from "react";

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
  image_url: string;
  pet: Pet
}

interface Pet {
  id: number
  owner_id: number
}

interface PetCardProps {
  pet: PetProfile
}

export default function PetCard({ pet }: PetCardProps) {
  // const icon = pet.species.toLowerCase() === "dog" ? "🐶" : "🐱";
  return (
    
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {/* {JSON.stringify(pet)} */}
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        <img
          src={pet.image_url}
          alt={pet.name}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* <img src={pet.image_url} alt="" /> */}
      </div>
      <div className="p-4">
        <Link href={`/pet/${pet.pet_id}`} className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:underline">
          <span>{pet.name}</span>
        </Link>
        <div className="mt-1 text-sm text-gray-700">
          <span className="text-red-600 font-semibold">{pet.age}</span>
          <span> • {pet.gender} • {pet.breed}</span>
        </div>
        <div className="mt-1 text-sm text-gray-600">📍 {pet.location}</div>
        <button className="mt-3 block mx-auto rounded-full bg-[#81C784] hover:bg-[#6FBF73] text-white px-5 py-2 text-sm shadow">
          Adopt Me 🐾
        </button>
      </div>
    </div>
  );
}


