"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);

      setTimeout(() => {
        router.push("/login");
      }, 4000);

    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl mb-2">Verify Email</h2>
      <h2 className="mt-2 p-2 bg-amber-700 font-semibold border rounded-2xl border-none">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl m-6 bg-green-900 p-3 mt-2 border-none border rounded-4xl font-extrabold">Email Verified</h2>
          <Link className="ml-23 bg-violet-900 p-3 border-none border rounded-4xl font-extrabold" href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl mt-3 p-2 bg-red-800 font-bold border rounded-3xl border-none">
            Error
          </h2>
        </div>
      )}
    </div>
  );
}
