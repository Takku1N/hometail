"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getPetById } from "@/lib/petsData";

export default function PetDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const pet = getPetById(params.id);

  if (!pet) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-10">
          <p className="text-lg">ไม่พบข้อมูลสัตว์เลี้ยง</p>
          <button className="mt-4 underline" onClick={() => router.push("/")}>กลับหน้าหลัก</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
        {/* Left: Image */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow">
          <Image src={pet.imageSrc} alt={pet.name} fill className="object-cover" />
        </div>

        {/* Right: Details */}
        <div>
          <div className="flex items-start justify-between">
            <h1 className="text-5xl font-extrabold">{pet.name}</h1>
            <div className="text-gray-700 font-semibold">{pet.ageText} • {pet.gender}</div>
          </div>

          {/* About */}
          <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: "#DFF1E3" }}>
            <h2 className="text-2xl font-bold mb-2">About</h2>
            <p className="text-gray-800 leading-7">{pet.about ?? pet.traits}</p>
          </div>

          {/* Basic Info + Health */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold">Basic Info</h3>
              <div className="mt-3 space-y-2 text-gray-800">
                <Row label="Breed" value={pet.breed} />
                <Row label="Location" value={pet.location} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Health</h3>
              <div className="mt-3 space-y-2 text-gray-800">
                <Row label="Vaccinations" value={pet.vaccinations ?? "-"} />
                <Row label="Neutered" value={pet.neutered ? "ทำหมันแล้ว" : "ยังไม่ได้ทำ"} />
              </div>
            </div>
          </div>

          {/* Medical Note box */}
          <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: "#DFF1E3" }}>
            <h3 className="text-2xl font-bold">Medical Note</h3>
            <p className="text-gray-700 mt-2">-</p>
          </div>

          {/* Footer actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/images/hometail_signin.png" alt="owner" width={40} height={40} className="rounded-full" />
              <span className="font-semibold">{pet.owner ?? "owner"}</span>
            </div>
            <button className="rounded-full border px-6 py-2 shadow bg-white">Contact</button>
            <button className="rounded-full bg-[#81C784] hover:bg-[#6FBF73] text-white px-6 py-2 shadow">Adopt Me 🐾</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}


