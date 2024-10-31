"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";

const AccountSettingsPage = () => {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData((prevData) => ({
            ...prevData,
            ...userDoc.data(),
            email: user.email || "", // Ensure email from Firebase Auth
          }));
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    await updateUserProfile(userData);
    toast({
      description: "Your changes have been saved!",
    });
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={() => router.back()}
        className="flex gap-12 items-center p-4 border-b-2 border-gray-300"
      >
        <IoArrowBackCircle size={38} />
        <h1 className="text-xl ">Account Settings</h1>
      </div>
      <form
        className="my-10 px-16 space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Personal Information Fields */}
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="First name"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Last name"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="Email"
          className="block w-full border border-gray-300 rounded-md p-3"
          readOnly
        />
        <input
          type="tel"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone number"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
      </form>

      <button
        onClick={handleSaveChanges}
        className="bg-orange-400 px-8 py-4 rounded-md mx-auto text-white"
      >
        Save Changes
      </button>
      <NavigationBottom />
    </div>
  );
};

export default AccountSettingsPage;
