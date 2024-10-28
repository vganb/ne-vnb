"use client";
import { useRouter } from "next/navigation";
import React from "react";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";

const AccountSettingsPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div
        onClick={() => router.back()}
        className="flex gap-12 items-center p-4 border-b-2 border-gray-300"
      >
        <IoArrowBackCircle size={38} />
        <h1 className="text-xl ">Account Settings</h1>
      </div>
      <form className="my-10 px-16 space-y-4">
        {/* Personal Information Fields */}
        <input
          type="text"
          placeholder="First name"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="text"
          placeholder="Last name"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="email"
          placeholder="Email"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="tel"
          placeholder="Phone number"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
      </form>

      <button className="bg-orange-400 px-8 py-4 rounded-md mx-auto text-white">
        Save Changes
      </button>
      <NavigationBottom />
    </div>
  );
};

export default AccountSettingsPage;
