"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { PetProfileInterface } from "@/interface";

import { useState, useEffect } from "react";
import axios from "axios";

export default function PetDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [petData, setPetData] = useState<PetProfileInterface>();

  useEffect(() => {
    const base_api = process.env.NEXT_PUBLIC_API_URL;
    const getPetData = async () => {
      try {
        const response = await axios.get(`${base_api}/pet/${params.id}`, { withCredentials: true });
        setPetData(response.data);
      } catch (err) {
        console.error("Failed to fetch pet:", err);
      }
    };
    getPetData();
  }, [params.id]);

  const createRequest = (pet_id:number) => {
    const base_api = process.env.NEXT_PUBLIC_API_URL
    const sendApi = async () => {
      try{
        const response = await axios.post(`${base_api}/request/${pet_id}`, {}, {withCredentials: true})
        console.log(response.data)
        alert("สร้างคำของสำเร็จ")
      } catch (error){
        console.error(error)
      }
    }
    sendApi()
  }

  if (!petData) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <p className="text-lg text-gray-700">ไม่พบข้อมูลสัตว์เลี้ยง {params.id}</p>
          <button
            className="mt-6 px-6 py-2 rounded-lg bg-green-300 hover:bg-green-400 text-white transition"
            onClick={() => router.push("/")}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
        {/* Left: Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={petData.image_url}
            alt={petData.name}
            className="object-cover w-full h-[500px] rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{petData.name}</h1>
              <div className="text-gray-600 font-medium text-lg">{petData.age} ขวบ • {petData.gender}</div>
            </div>

            {/* About */}
            <div className="mt-6 p-6 rounded-2xl bg-green-50 shadow-inner">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">About</h2>
              <p className="text-gray-700 leading-7">{petData.description}</p>
            </div>

            {/* Basic Info + Health */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-2xl shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Basic Info</h3>
                <Row label="Breed" value={petData.breed} />
                <Row label="Location" value={petData.location} />
              </div>
              <div className="p-5 bg-white rounded-2xl shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Health</h3>
                <Row label="Vaccinations" value={petData.vaccinated ? "ฉีดวัคซีนแล้ว" : "ยังไม่ฉีดวัคซีน"} />
                <Row label="Neutered" value={petData.neutered ? "ทำหมันแล้ว" : "ยังไม่ได้ทำ"} />
              </div>
            </div>

            {/* Medical Note */}
            <div className="mt-6 p-6 rounded-2xl bg-green-50 shadow-inner">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Medical Note</h3>
              <p className="text-gray-700">{petData.medical_note || "-"}</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/hometail_signin.png"
                alt="owner"
                width={50}
                height={50}
                className="rounded-full border"
              />
              <span className="font-medium text-gray-800">เจ้าของ</span>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              {/* <button className="px-6 py-2 rounded-full border border-gray-300 shadow hover:bg-gray-100 transition">
                Contact
              </button> */}
              <button className="px-6 py-2 rounded-full bg-green-400 hover:bg-green-500 text-white shadow transition" onClick={() => {createRequest(petData.pet_id)}}>
                Adopt Me 🐾
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-200">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
