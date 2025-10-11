"use client";

// import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Title */}
      <section className="mx-auto max-w-7xl px-4 pt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800">HomeTail</h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700">Where Every Tail Finds a Home</p>
      </section>

      {/* Hero banner */}
      <section className="w-full mt-6">
        <div className="relative mx-auto max-w-7xl h-56 md:h-72 lg:h-96 overflow-hidden rounded-xl">
          <img
            src="/images/hometail_signin.png"
            alt="About banner"
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Intro text */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-center text-lg md:text-xl text-gray-800">
          HomeTail เป็นแพลตฟอร์มที่ช่วยหาบ้านใหม่ให้สัตว์จรจัดและสัตว์ที่ต้องการเจ้าของใหม่ เราเชื่อว่าทุกชีวิตควรได้รับความรักและบ้านที่อบอุ่น
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-10 rounded-2xl" style={{ backgroundColor: "#F7E6EA" }}>
        <h2 className="text-3xl font-extrabold text-center text-green-800">Our Mission</h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionItems.map((item) => (
            <div key={item.title} className="text-center">
              <div className="relative mx-auto w-56 h-56 rounded-lg overflow-hidden shadow-md bg-white">
                <img src={item.image} alt={item.title} className="object-cover" />
              </div>
              <p className="mt-3 text-gray-800 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-12 text-center">
        <p className="text-2xl md:text-3xl font-semibold text-gray-800">
          “คุณเองก็สามารถเป็นส่วนหนึ่งของการเปลี่ยนแปลงได้”
        </p>
        <div className="mt-6 flex items-center justify-center gap-6">
          <Link href="/" className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 shadow">
            Find a Pet 🐶🐱
          </Link>
          <Link href="/donate" className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 shadow">
            Donate 💰
          </Link>
        </div>
      </section>
    </main>
  );
}

const missionItems = [
  {
    title: "ช่วยสัตว์จรจัดให้มีบ้านใหม่",
    image: "/images/hometail_signin.png",
  },
  {
    title: "ลดจำนวนสัตว์ถูกทอดทิ้ง",
    image: "/images/hometail_icon.png",
  },
  {
    title: "เชื่อมต่อคนรักสัตว์กับเจ้าของอาสาสมัคร",
    image: "/images/back-button.png",
  },
  {
    title: "ส่งเสริมการรับเลี้ยงอย่างมีความรับผิดชอบ",
    image: "/images/hometail_signin.png",
  },
];


