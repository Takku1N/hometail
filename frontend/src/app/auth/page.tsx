"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { tree } from "next/dist/build/templates/app-page";

export default function AuthPage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  const [isSignIn, setIsSignIn] = useState(true);
  const [isSetEmail, setIsSetEmail] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [facebook, setFacebook] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // API Func
  const signIn = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signin`, {
        email: email, password: password
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log(response);
      alert("ล็อคอินสำเร็จ")
      router.push("/");
    } catch (err) {
      alert("พบข้อผิดพลาด กรุณาลงชื่อเข้าใช้ใหม่");
      setPassword("");
      console.error('Error from signin:', err);
    }
  }

  const signUp = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        facebook: facebook,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log(response);
      resetUseState("all");
      alert("ลงทะเบียนสำเร็จ โปรดรอผู้ดูแลระบบอนุมัติ");
      router.push("/auth");
    } catch (err) {
      alert("พบข้อผิดพลาด กรุณาสมัครใหม่");
      setIsSetEmail(true);
      setPassword("");
      setConfirmPassword("");
      console.error('Error from signup:', err);
    }
  }

  const changePassword = async () => {
    try {
      const response = await axios.post(`${apiUrl}/auth/change_password`, {
        email: email, password: password
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      resetUseState("all");
      alert("เปลี่ยนรหัสเสร็จเรียบร้อยแล้ว");
      router.push("/auth");
    } catch (err) {
      alert("พบข้อผิดพลาด กดเปลี่ยนรหัสใหม่");
      setPassword("");
      setConfirmPassword("");
      console.error('Error from signup:', err);
    }
  }

  const resetUseState = (context: String) => {
    if (context=="all") {
      setIsSetEmail(true);
      setIsSignIn(true);
      setIsForgetPassword(false);

      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setFacebook("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else if (context=="input") {
      setFirstName("");setLastName("");setPhoneNumber("");setFacebook("");setEmail("");setPassword("");setConfirmPassword("");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call API
    if (isSignIn) {
      signIn();
    } else if (isForgetPassword) {
      if (password !== confirmPassword) {alert("Passwords do not match!"); return;}
      changePassword();
    } else {
      if (isSetEmail) {
        if (password !== confirmPassword) {alert("Passwords do not match!"); return;}
        setIsSetEmail(false)
      } else {
        signUp();
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center relative" style={{ backgroundColor: "#FADFD6" }}>
        <div className="absolute top-6 left-6">
          {/* <h1 className="text-3xl font-bold text-gray-700">HomeTail</h1>
          <p className="text-sm text-gray-500">Where every tail finds a home</p> */}
          <img 
          src="/images/hometail_icon.png"
          alt="hometail_icon"
          width={200}
          height={112.9}
          />
        </div>
        {/* <div className="flex flex-col items-center mt-12"> */}
          <img
            src="/images/hometail_signin.png"
            alt="hometail_signin"
            width={750}
            height={700}
            className="mb-4"
          />
        {/* </div> */}
        <div className="absolute bottom-8 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            {isSignIn ? "SIGN IN TO HOMETAIL 🐾" : "SIGN UP FOR HOMETAIL 🐾"}
          </h2>
          <p className="text-gray-600 font-semibold">
            WHERE EVERY TAIL FINDS A HOME
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-pink-200 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-10 w-3/4 max-w-md"
        >
          <div className="flex items-center mb-6">
            {/* Back button */}
            {((!isSignIn && !isSetEmail) || isForgetPassword) && (
              <button
                type="button"
                onClick={() => {setIsSetEmail(isForgetPassword?isSetEmail:true); setIsSignIn(isForgetPassword?true:false); setIsForgetPassword(false)}}
                className="mr-4 p-2 rounded-full hover:bg-gray-200"
              >
                <Image src="/images/back-button.png" alt="Back button" width={40} height={40} />
              </button>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-800">
              {isSignIn ? "SIGN IN" : isForgetPassword ? "RESET PASSWORD" : "SIGN UP"}
            </h2>
          </div>

          {/* Full Name */}
          {!isSignIn && !isSetEmail && !isForgetPassword && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
                />
              </div>
            </div>
          )}
          

          {/* Phone Number */}
          {!isSignIn && !isSetEmail && !isForgetPassword && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                placeholder="xxxxxxxxxx"
                pattern="[0-9]{10}"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>
          )}

          {/* Facebook */}
          {!isSignIn && !isSetEmail && !isForgetPassword && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="text"
                placeholder="Your facebook url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>
          )}

          {/* Email */}
          {isSetEmail && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                placeholder="youname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>
          )}
          

          {/* Password */}
          {isSetEmail && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>
          )}
          

          {/* Confirm Password (Sign Up & Forget Password) */}
          {((!isSignIn && isSetEmail) || isForgetPassword) && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 focus:outline-none"
              />
            </div>
          )}

          {/* Forgot password (Sign In only) */}
          {isSignIn && (
            <div className="text-right mt-1 mb-4">
              <button
                type="button"
                onClick={() => {setIsForgetPassword(true); setIsSignIn(false); resetUseState("input")}}
                className="text-sm text-gray-500 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-200 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            {isSignIn ? "Sign In" : isForgetPassword ? "Reset Password" : "Sign Up"}
          </button>

          {/* Toggle Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {isSignIn ? "Don’t have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {setIsSignIn(isForgetPassword ? true : !isSignIn); setIsSetEmail(true); setIsForgetPassword(false); resetUseState("input");}}
              className="text-red-500 font-semibold hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
