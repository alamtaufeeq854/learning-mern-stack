"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function profilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>("nothing");

  const Logout = async () => {
    try {
      const response = await axios.get("api/users/logout");

      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setUser(res.data.data);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl">Profile </h1>
      <hr />
      <p className="text-1xl py-2">Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {user === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${user._id}`}>{user.username}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={() => {
          Logout();
        }}
        className="bg-red-700 p-2 px-3 border rounded-3xl border-none mt-2 font-bold hover:bg-red-500">
        Logout
      </button>

      <button
        onClick={() => {
          getUserDetails();
        }}
        className="bg-green-800 p-2 px-3 border rounded-3xl border-none mt-2 font-bold hover:bg-cyan-800">
        View Profile
      </button>
    </div>
  );
}
