"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import axios from "axios";
interface NavbarProps {
  onSearchChange?: (value: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const pathname = usePathname();
  const isPets = pathname === "/" || pathname.startsWith("/pets");
  const isDonate = pathname.startsWith("/donate");
  const isAbout = pathname.startsWith("/about-us");

  const activeCls = "underline underline-offset-4 text-gray-900";
  const idleCls = "hover:text-gray-900";
  return (
    <nav className="w-full">
      {/* Top bar: logo, right-aligned search near avatar */}
      <div className="border-b border-pink-200" style={{ backgroundColor: "#F3D0D7" }}>
        <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-[auto_1fr_auto_auto] items-center gap-4">
          {/* Logo bigger */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/hometail_icon.png" alt="HomeTail" width={96} height={96} className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />
          </Link>

          <div />

          {/* Search near avatar on the right */}
          <div className="w-56 md:w-72 lg:w-80 xl:w-96 relative">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pl-10 shadow-sm outline-none focus:ring-2 focus:ring-green-400"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* Avatar with dropdown */}
          <ProfileMenu />
        </div>
      </div>

      {/* Secondary nav: left links, right About us */}
      <div className="bg-white" style={{ backgroundColor: "#FFEFEF" }}>
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/" className={isPets ? activeCls : idleCls} aria-current={isPets ? "page" : undefined}>Pets</Link>
            <Link href="/donate" className={isDonate ? activeCls : idleCls} aria-current={isDonate ? "page" : undefined}>Donate</Link>
          </div>
          <Link href="/about-us" className={`font-semibold ${isAbout ? activeCls : idleCls}`} aria-current={isAbout ? "page" : undefined}>About us</Link>
        </div>
      </div>
    </nav>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const signout = async () => {
    const base_api = process.env.NEXT_PUBLIC_API_URL
    await axios.get(`${base_api}/signout`, {withCredentials:true})
    redirect('/auth')
  }
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 cursor-pointer"
      >
        <Image src="/images/hometail_signin.png" alt="Profile" width={40} height={40} className="rounded-full" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-50"
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            My profile
          </Link>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer"
            role="menuitem"
            onClick={signout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}


