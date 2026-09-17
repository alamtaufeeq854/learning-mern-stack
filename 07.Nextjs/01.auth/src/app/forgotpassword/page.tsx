"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function forgotPasswordPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const forgotPasswordEmail = async () => {
    try {
      await axios.post("/api/users/forgot-password", { token });
      setVerified(true);

      // setTimeout(() => {
      //   router.push("");
      // });
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      forgotPasswordEmail();
    }
  }, [token]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="mb-5 text-2xl font-extrabold ">Forgot Password</h1>
      <input
        type="email"
        className="bg-white text-1xl p-2 text-black font-semibold border-none border rounded"
        placeholder="Enter Email"
      />

      <button className="bg-amber-900 mt-3 p-2 border rounded-md border-none font-bold hover:bg-amber-700">
        Submit
      </button>
    </div>
  );
}
