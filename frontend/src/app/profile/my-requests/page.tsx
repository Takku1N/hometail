"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { RequestInterface, PetInterface, UserInterface, UserProfileInterface, PetProfileInterface } from "@/interface";
import axios from "axios";

type Status = "Approved" | "Rejected" | "Pending";

export default function MyRequestsPage() {
  const [allActive, setAllActive] = useState<boolean>(true)
  const [pendingActive, setPendingActive] = useState<boolean>(false)
  const [rejectedActive, setRejectedActive] = useState<boolean>(false)
  const [completeActive, setCompleteActive] = useState<boolean>(false)
  const [allRequest, setAllRequest] = useState<RequestInterface[]>([])
  const [displayRequest, setDisplayRequest] = useState<RequestInterface[]>([])

  // const requests: Array<{
  //   id: string;
  //   image: string;
  //   title: string;
  //   subtitle: string;
  //   owner: string;
  //   status: Status;
  // }> = [
  //   {
  //     id: "iq",
  //     image: "/images/husky.jpg",
  //     title: "iQ",
  //     subtitle: "2 ขวบ • เพศผู้ • Beagle",
  //     owner: "@banana",
  //     status: "Approved",
  //   },
  //   {
  //     id: "mochi",
  //     image: "/images/hometail_signin.png",
  //     title: "Mochi",
  //     subtitle: "10 เดือน • เพศเมีย • CatThaiBaann",
  //     owner: "@ink",
  //     status: "Pending",
  //   },
  //   {
  //     id: "lukplub",
  //     image: "/images/hometail_icon.png",
  //     title: "Lukplub",
  //     subtitle: "4 ขวบ • เพศผู้ • Siberian Husky",
  //     owner: "@mike",
  //     status: "Rejected",
  //   },
  // ];

  useEffect(() => {
      const fetchRequest = async () => {
        const base_api = process.env.NEXT_PUBLIC_API_URL
        const response = await axios.get(`${base_api}/request/myrequest`, {withCredentials: true})
        setAllRequest(response.data)
      }
      fetchRequest()
  }, [])

  useEffect(() => {
    if (allActive){
      setDisplayRequest(allRequest)
    }
    if (pendingActive){
      setDisplayRequest(allRequest.filter((request) => request.status === "Pending"))
    }
    if (rejectedActive){
      setDisplayRequest(allRequest.filter((request) => request.status === "Rejected"))
    }
    if (completeActive){
      setDisplayRequest(allRequest.filter((request) => request.status === "Approved"))
    }
  }, [allActive, pendingActive, rejectedActive, completeActive, allRequest])

  const openAll = () => {
    setAllActive(true)
    setRejectedActive(false)
    setPendingActive(false)
    setCompleteActive(false)
  }

  const openAvailable = () => {
    setAllActive(false)
    setRejectedActive(false)
    setPendingActive(true)
    setCompleteActive(false)
  }

  const openrejected = () => {
    setAllActive(false)
    setRejectedActive(true)
    setPendingActive(false)
    setCompleteActive(false)
  }

  const openComplete = () => {
    setAllActive(false)
    setRejectedActive(false)
    setPendingActive(false)
    setCompleteActive(true)

  }
  

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {/* {JSON.stringify(displayRequest)} */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-extrabold">My Requests</h1>
        <p className="text-gray-700 mt-2">ติดตามคำขอรับเลี้ยงของคุณได้ที่นี่</p>

        {/* Filters */}
        <div className="mt-4 flex items-center gap-3">
          <button className={`${allActive ? "px-3 text-green-500 bg-green-100 rounded-lg" : "px-3 text-red-500 bg-red-100 rounded-lg"}`} onClick={openAll}> All </button>
          <button className={`${pendingActive ? "px-3 text-green-500 bg-green-100 rounded-lg" : "px-3 text-red-500 bg-red-100 rounded-lg"}`} onClick={openAvailable}> Pending </button>
          <button className={`${rejectedActive ? "px-3 text-green-500 bg-green-100 rounded-lg" : "px-3 text-red-500 bg-red-100 rounded-lg"}`} onClick={openrejected}> Rejected </button>
          <button className={`${completeActive ? "px-3 text-green-500 bg-green-100 rounded-lg" : "px-3 text-red-500 bg-red-100 rounded-lg"}`} onClick={openComplete}> Approved </button>
        </div>

        <div className="mt-6 space-y-6">
          {displayRequest.map((request) => (
            <RequestCard key={request.id} request = {request}/>
          ))}
        </div>
      </div>
    </main>
  );
}

function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={`${active ? "bg-green-200 text-green-800" : "bg-gray-100 text-gray-700"} rounded-full px-3 py-1 text-sm font-semibold`}>
      {children}
    </span>
  );
}

function statusStyles(status: Status) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
  }
}

function RequestCard({request}: {request:RequestInterface}) {
  return (
    <div className="w-full rounded-2xl bg-white shadow border overflow-hidden flex items-stretch">
      <div className="relative w-[220px] h-[150px] md:w-[260px] md:h-[170px]">
        <img src={request.pet.profile.image_url} alt="" className="object-cover" />
      </div>
      <div className="flex-1 p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles(request.status)}`}>{request.status}</div>
          <div className="text-xs text-gray-600">owner <a href={request?.pet?.owner?.user_profile?.facebook} target="_blank" className="text-blue-500">@</a> {request?.pet?.owner?.user_profile?.first_name}</div>
        </div>
        <h3 className="mt-2 text-xl font-extrabold">🐶 {request.pet.profile.name}</h3>
        <div className="text-sm text-gray-800">{request.pet.profile.age} ขวบ • {request.pet.profile.gender} • {request.pet.profile.breed}</div>
      </div>
    </div>
  );
}



