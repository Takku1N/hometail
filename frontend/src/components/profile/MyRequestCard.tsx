'use client'
import React from 'react'
import { RequestInterface, PetInterface, UserInterface, UserProfileInterface } from '@/interface'
import axios from 'axios'
import fetchData from '@/app/fetchData'
import { useRouter } from 'next/navigation'
export default function MyRequestCard({req}: {req:RequestInterface}) {

  const router = useRouter()

  const handleRequest = async (request_id:number, method:string) => {
    const base_api = process.env.NEXT_PUBLIC_API_URL
    if (method === "reject"){
        const result = await axios.put(`${base_api}/request/reject/${request_id}`, {}, {withCredentials: true})
        router.refresh()
    } else{
        const result = await axios.put(`${base_api}/request/approve/${request_id}`, {}, {withCredentials: true})
        router.refresh()
    }
  }
  return (
    <div className="rounded-xl bg-white p-3 flex items-center gap-4 shadow-sm w-full hover:-translate-y-1 duration-200 hover:bg-gray-100 hover:shadow-lg" key={req.id}>
        <div className="relative w-28 h-20 rounded-lg overflow-hidden">
            <img src={req.pet.profile.image_url} alt="iQ" className="object-cover" />
        </div>
        <div className="flex-1">
            <div className="font-bold">{req.pet.profile.name}</div>
            <div className="text-sm text-gray-700">{req.pet.profile.age} ขวบ • {req.pet.profile.gender} • {req.pet.profile.breed}</div>
            <div className="text-xs text-gray-500 mt-1">Adopted by @ <a href={req.requester.user_profile?.facebook} className="text-blue-500" target="_blank"> {req.requester.user_profile?.first_name}</a></div>
        </div>
        <button className="rounded-md bg-pink-100 px-3 py-1 text-sm" onClick={() => {handleRequest(req.id, "reject")}}>Reject</button>
        <button className="rounded-md bg-green-200 px-3 py-1 text-sm" onClick={() => {handleRequest(req.id, "accept")}}>Accept</button>
    </div>
  )
}
