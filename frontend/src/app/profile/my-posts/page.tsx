"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

import { PetInterface, PetProfileInterface } from "@/interface";

export default function MyPostsPage() {

  const [allPet, setAllPet] = useState<PetInterface[]>([])
  useEffect(() => {
      const fetchPet = async () => {
        const base_api = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${base_api}/pet/owner`, {withCredentials: true})
        setAllPet(response.data)
      }
      fetchPet()
  }, [])
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {JSON.stringify(allPet)}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">My Posts</h1>
          <Link href="/profile/my-posts/create" className="flex items-center gap-2 rounded-full bg-green-200 hover:bg-green-300 text-gray-900 px-4 py-2 shadow">
            <span>➕</span>
            <span>create</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-4 flex items-center gap-3">
          <button className="px-3 text-green-500 bg-green-100 rounded-lg"> All </button>
          <Chip>Available</Chip>
          <Chip>Adopted</Chip>
        </div>

        {/* Post cards */}
        <div className="mt-6 space-y-6">

          {allPet.map((pet) => (
            <PostCard
            image={pet.profile.image_url}
            title={pet.profile.name}
            location={pet.profile.location}
            desc={pet.profile.description}
            adopted={pet.profile.adopted}
            age={pet.profile.age}
            gender={pet.profile.gender}
            breed={pet.profile.breed}
            key={pet.id}/>
          ))}
          

          
        </div>
      </div>
    </main>
  );
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`${active ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-700"} rounded-full px-3 py-1 text-sm font-semibold`}
    >
      {children}
    </span>
  );
}

function PostCard({
  image,
  title,
  location,
  desc,
  adopted,
  age,
  gender,
  breed,
}: {
  image: string;
  title: string;
  location: string;
  desc: string;
  adopted?: boolean;
  age: number
  gender: string
  breed: string
}) {
  return (
    <div
      className={`w-full rounded-2xl bg-white shadow border overflow-hidden flex items-stretch `}
    >
      <div className="relative w-[260px] h-[180px] md:w-[300px] md:h-[200px]">
        <img src={image} alt={title} className="object-cover" />
      </div>
      <div className="flex-1 p-4 md:p-6">
        <div className="flex items-start justify-between">
        </div>
        {adopted ? (
          <h2 className="text-lg text-green-500"> Adopted </h2>
        ): null}
        <h3 className="mt-1 text-xl font-extrabold">🐶 {title}</h3>
        <div className="text-sm text-gray-800">{age} ปี- {gender} - {breed} </div>
        <div className="text-sm text-gray-700 mt-1">📍 {location}</div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>

        <div className="mt-3 flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full bg-green-200 px-4 py-2 text-gray-900 cursor-pointer">
            <span>✏️</span>
            <span>Edit</span>
          </button>
          <button className="rounded-full bg-red-200 px-4 py-2 text-gray-900 cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
}



