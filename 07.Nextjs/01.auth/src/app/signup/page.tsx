"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      if (buttonDisabled === false) {
        setLoading(true);
        const response = await axios.post("/api/users/signup", user);

        if (response.data.success) {
          toast.success(response.data.message);
          router.push("/login");
        } else {
          toast.error(response.data.message);
        }
        // console.log("SignUp Sucess", response.data);
      } else {
        toast.error("Please, Fill up all the fields !");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup Failed, Try again Later !",
      );
      console.log("SignUp Failed !", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div>
      <div className="h-screen text-center flex justify-center items-center flex-col">
        <h1 className="text-4xl mb-5 line-through underline font-sans">
          {loading ? "Processing..." : "SignUp"}
        </h1>
        <label htmlFor="username" className="text-2xl font-bold py-4 mr-1">
          Username
        </label>
        <input
          className="p-3 bg-white text-black border-none border rounded-md  focus:bg-gray-200  placeholder:text-gray-600 font-medium"
          type="text"
          id="username"
          placeholder="Enter your Username..."
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />

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
            handleSignup();
          }}
          className="mt-5 bg-purple-700 p-4 px-5 border rounded-4xl border-none outline-none font-bold hover:bg-purple-600 hover:font-extrabold">
          {buttonDisabled ? "SignUp Disabled" : "SignUp"}
        </button>

        <h1 className="mt-4">
          Already Have Account ?{" "}
          <Link href="/login" className="text-blue-400">
            Visit here
          </Link>{" "}
        </h1>
      </div>
    </div>
  );
}
