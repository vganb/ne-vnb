"use client";
import React from "react";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import ProfileIcon from "../components/ProfileIcon";
import BookingsIcon from "../components/BookingsIcon";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth(); // Get the user and logout function from AuthContext

  const router = useRouter();
  const handleLogout = async () => {
    if (user) {
      await logout();
      router.push("/");
    } else {
      router.push("/login");
    }
  };
  return (
    <div>
      <div
        onClick={() => router.push("/")}
        className="flex gap-12 items-center p-4 border-b-2 border-gray-300"
      >
        <IoArrowBackCircle size={38} />
        <h1 className="text-xl ">Profile</h1>
      </div>
      {/* Account Settings */}
      <div
        onClick={() => router.push("/accountsettings")}
        className="flex items-center justify-between py-4 px-12 cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <ProfileIcon className={""} />
        </div>
        <p>Account Settings</p>
        <IoIosArrowForward size={25} />
      </div>
      {/* My Bookings */}

      <div
        onClick={() => router.push("/mybookings")}
        className="flex items-center justify-between py-4 px-12  cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <BookingsIcon className={""} />
        </div>
        <p>My Bookings</p>
        <IoIosArrowForward size={25} />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="fixed bottom-44 right-8 bg-orange-600 px-8 py-2 rounded-md mt-20 text-white font-bold"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>
      {/* Navigation Bottom */}
      <NavigationBottom />
    </div>
  );
};

export default ProfilePage;
