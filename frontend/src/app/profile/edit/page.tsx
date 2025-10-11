"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react"; // <--- 1. นำเข้า useRef
import fetchData from "@/app/fetchData";
import axios from "axios";

import { UserProfileInterface, UserInterface, MyProfileResponse } from "@/interface";

export default function EditProfilePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("")
  const [profileData, setProfileData] = useState<MyProfileResponse>()
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  // 2. สร้าง Ref สำหรับ File Input ที่จะซ่อน
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const myUser = async () => {
        const base_api = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${base_api}/auth/myprofile` , {withCredentials: true})
        setFirstName(response.data.userData.user_profile.first_name)
        setLastName(response.data.userData.user_profile.last_name)
        setEmail(response.data.userData.email)
        setPhone(response.data.userData.user_profile.phone_number)
        setProfileImage(response.data.userData.user_profile.image_url)
    } 
    myUser()
  }, [])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    if (currentFile){
      formData.append("image", currentFile)
    } else {
      console.log("No file selected")
    }

    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("phone_number", phone)
    formData.append("email", email)
    const sendData = async () => {
        const base_api = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.put(`${base_api}/user/editprofile`, formData, {withCredentials: true})
        console.log(response.data)
        router.push('/profile')
    }

    // ยิง "api"
    try{
      sendData()
    } catch (error){
      console.error(error)
    }
    // router.push("/profile");
  }

  // 3. ฟังก์ชันเมื่อคลิกปุ่ม "Change picture"
  const handleImageChangeClick = () => {
    fileInputRef.current?.click(); // สั่งให้ input ที่ซ่อนอยู่ทำงาน
  };

  // 4. ฟังก์ชันเมื่อเลือกไฟล์เสร็จสิ้น (สำหรับแสดง Preview)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // สร้าง Object URL สำหรับแสดงรูปภาพ Preview ทันที
      console.log("ไฟล์ที่ถูกเลือก", file)
      const newImageUrl = URL.createObjectURL(file);
      setProfileImage(newImageUrl);
      setCurrentFile(file)
      // *** หมายเหตุ: ถ้าต้องการอัพโหลดจริง ให้เรียกฟังก์ชันอัพโหลดตรงนี้
      // uploadProfileImage(file);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl bg-white shadow p-6 md:p-10">
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
            
            {/* 5. Input สำหรับเลือกไฟล์ที่ซ่อนอยู่ */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            
            {/* Avatar */}
            <div className="flex flex-col items-center">
              
              {profileImage ? (
                // แนะนำให้กำหนด width/height ด้วย
                <img src={profileImage} alt="avatar" className="object-cover border rounded-[100%] p-3" width={130} height={130} />
              ): (
                // เปลี่ยนจาก <h1> เป็น div ที่มีสไตล์ เพื่อให้ขนาดใกล้เคียงกัน
                <div className="flex items-center justify-center border rounded-[100%] p-3 bg-gray-200" style={{ width: 130, height: 130 }}>
                    <span className="text-gray-500">Loading...</span>
                </div>
              )}
              
              <div className="mt-4 flex items-center gap-3">
                {/* 6. เชื่อมปุ่ม "Change picture" เข้ากับฟังก์ชันใหม่ */}
                <button 
                    type="button" 
                    onClick={handleImageChangeClick} // <--- เพิ่ม onClick นี้
                    className="rounded-lg bg-pink-100 hover:bg-pink-200 px-4 py-2 text-sm"
                >
                    Change picture
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="First Name" required>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Name"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
                <Field label="Last Name" required>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Surname"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Email" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className="w-full rounded-xl border border-green-300 px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                  />
                </Field>
              </div>

              {/* ... ส่วนของ Address ถูกคอมเมนต์ไว้ ... */}

              <div className="flex items-center justify-end gap-4 pt-2">
                <button type="button" onClick={() => router.back()} className="rounded-lg bg-gray-100 hover:bg-gray-200 px-5 py-2">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-green-300 hover:bg-green-400 px-5 py-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-2 text-gray-700">{label} {required && <span className="text-red-500">*</span>}</span>
      {children}
    </label>
  );
}