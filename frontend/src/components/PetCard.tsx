import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface PetInfo {
  id: string;
  name: string;
  species: "dog" | "cat";
  ageText: string; // e.g., "2 ขวบ"
  gender: string; // เพศผู้ / เพศเมีย
  breed: string;
  location: string;
  traits: string; // short sentence
  imageSrc: string; // public path
}

export default function PetCard({ pet }: { pet: PetInfo }) {
  const icon = pet.species === "dog" ? "🐶" : "🐱";
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="relative w-full h-64 md:h-72 lg:h-80">
        <Image
          src={pet.imageSrc}
          alt={pet.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <Link href={`/pets/${pet.id}`} className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:underline">
          <span>{icon}</span>
          <span>{pet.name}</span>
        </Link>
        <div className="mt-1 text-sm text-gray-700">
          <span className="text-red-600 font-semibold">{pet.ageText}</span>
          <span> • {pet.gender} • {pet.breed}</span>
        </div>
        <div className="mt-1 text-sm text-gray-600">📍 {pet.location}</div>
        <p className="mt-2 text-sm text-gray-600 leading-6">{pet.traits}</p>
        <button className="mt-3 block mx-auto rounded-full bg-[#81C784] hover:bg-[#6FBF73] text-white px-5 py-2 text-sm shadow">
          Adopt Me 🐾
        </button>
      </div>
    </div>
  );
}


