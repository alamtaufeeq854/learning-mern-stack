"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      if (!buttonDisabled) {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);

        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/profile");
        } else {
          toast.error(response.data.message);
        }

        // console.log("Login Success !", response.data);
      } else {
        toast.error("Please, Fill up all the fields !");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed, Try again Later !",
      );
      console.log("Login Failed !", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen text-center flex justify-center items-center flex-col">
        <h1 className="text-4xl mb-5 line-through underline font-sans">
          {loading ? "Processing..." : "Login"}
        </h1>

        <label htmlFor="email" className="text-2xl font-bold py-4 mr-1 mt-3">
          Email
        </label>
        <input
          className="p-3 bg-white text-black border-none border rounded-md focus:bg-gray-200  placeholder:text-gray-600 font-medium"
          type="email"
          id="email"
          placeholder="Enter your Email..."
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />

        <label htmlFor="password" className="text-2xl font-bold py-4 mr-1 mt-3">
          Password
        </label>
        <input
          className="p-3 bg-white text-black border-none border rounded-md  focus:bg-gray-200 placeholder:text-gray-600 font-medium"
          type="password"
          id="password"
          placeholder="Enter your Password..."
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />

        <button
          onClick={() => {
            handleLogin();
          }}
          className="mt-5 bg-purple-700 p-4 px-5 border rounded-4xl border-none outline-none font-bold  hover:bg-purple-600 hover:font-extrabold">
          {buttonDisabled ? "Login Disabled" : "Login"}
        </button>

        <h1 className="mt-4">
          Don't Have Account ?{" "}
          <Link href="/signup" className="text-blue-400">
            Visit here
          </Link>
        </h1>
      </div>
    </div>
  );
}
