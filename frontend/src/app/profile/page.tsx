export const dynamic = 'force-dynamic';

import { cookies } from "next/headers";

// import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

import axios from "axios";
import { getProfile } from '../../getProfile'
import { RequestInterface } from "@/interface";
import MyRequestCard from "@/components/profile/MyRequestCard";

export default async function ProfilePage() {
  const base_api = process.env.SERVER_SIDE_API_URL
  const response = await getProfile()
  const userData = response.userData
  

  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString();
  const res = await axios.get(`${base_api}/request/owner`, {
    headers: {Cookie: cookieHeader},
    withCredentials: true,
  })
  
  const allRequest = res.data
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile card */}
          <div className="rounded-2xl bg-white shadow p-6">
            <div className="flex flex-col items-center text-center">
              <img src={userData.user_profile.image_url} alt="avatar" width={120} height={120} className="rounded-full border" />
              <h2 className="mt-4 text-xl font-bold">{userData.user_profile.first_name} {userData.user_profile.last_name}</h2>
              <span className="text-green-600 mt-1">{userData.role}</span>
              <Link href="/profile/edit" className="mt-4 inline-block rounded-lg bg-pink-100 hover:bg-pink-200 px-4 py-2">Edit Profile</Link>
            </div>
          </div>

          {/* About card */}
          <div className="rounded-2xl bg-white shadow p-6">
            <h3 className="text-xl font-bold mb-4">About</h3>
            <div className="divide-y">
              <Row label="Email" value={userData.email} />
              <Row label="Phone" value={userData.user_profile.phone_number} />
              {/* <Row label="Address" value="Bangkok ,TH" /> */}
            </div>
          </div>

          {/* Buttons */}
          <Link href="/profile/my-posts" className="block rounded-2xl bg-white shadow p-5 text-lg font-semibold hover:bg-gray-50">My Posts</Link>
          <Link href="/profile/my-requests" className="block rounded-2xl bg-white shadow p-5 text-lg font-semibold hover:bg-gray-50">My Requests</Link>
        </div>

        {/* Right column */}
        <div className="rounded-2xl bg-white shadow p-6">
          <h3 className="text-2xl font-extrabold">My Adoption Requests</h3>
          <p className="text-green-600">Track your adoption requests and their status</p>
          <hr className="my-4 border-gray-300"/>

          {/* Sample request card */}
          {allRequest.map((req:RequestInterface) => (
            <MyRequestCard req={req} key={req.id}/>
          ))}

        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}


