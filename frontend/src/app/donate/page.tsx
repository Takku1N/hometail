"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Support Our Mission</h1>
      </section>

      {/* Hero banner */}
      <section className="w-full">
        <div className="relative mx-auto max-w-7xl h-56 md:h-72 lg:h-96 overflow-hidden rounded-xl">
          <Image
            src="/images/hometail_signin.png"
            alt="Donate banner"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center text-lg md:text-xl text-gray-700 font-semibold">
          “ทุกการช่วยเหลือของคุณ คือโอกาสให้น้อง ๆ ได้บ้านที่อบอุ่น”
        </p>

        {/* Donation Options */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800">Donation Options :</h2>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Option 1: QR (left) */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-green-800 text-green-800 font-bold">1</div>
                <span className="text-gray-700">สแกน QR เพื่อบริจาค</span>
              </div>
              <div className="pl-12">
                <div className="w-44 h-44 md:w-48 md:h-48 rounded-lg border-2 border-gray-300 bg-white flex items-center justify-center">
                  {/* QR placeholder */}
                  <div className="grid grid-cols-3 gap-1">
                    <span className="w-5 h-5 bg-gray-900 inline-block" />
                    <span className="w-5 h-5 bg-gray-300 inline-block" />
                    <span className="w-5 h-5 bg-gray-900 inline-block" />
                    <span className="w-5 h-5 bg-gray-300 inline-block" />
                    <span className="w-5 h-5 bg-gray-900 inline-block" />
                    <span className="w-5 h-5 bg-gray-300 inline-block" />
                    <span className="w-5 h-5 bg-gray-900 inline-block" />
                    <span className="w-5 h-5 bg-gray-300 inline-block" />
                    <span className="w-5 h-5 bg-gray-900 inline-block" />
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2: Bank details (right) */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-green-800 text-green-800 font-bold">2</div>
                <span className="text-gray-700">โอนผ่านบัญชีธนาคาร</span>
              </div>
              <div className="pl-12 space-y-2">
                <p className="text-gray-800 font-semibold">เลขบัญชี : xxx-xxxx-xxxx</p>
                <p className="text-gray-800 font-semibold">ธนาคาร : xxxx</p>
                <p className="text-gray-800 font-semibold">ชื่อบัญชี : หมานแมวน่ารักยิ่งสงเคราะห์</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


