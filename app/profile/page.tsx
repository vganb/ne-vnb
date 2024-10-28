"use client";
import React from "react";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import ProfileIcon from "../components/ProfileIcon";
import BookingsIcon from "../components/BookingsIcon";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.push("/")}
        className="flex gap-12 items-center p-4"
      >
        <IoArrowBackCircle size={38} />
        <h1 className="text-xl ">Profile</h1>
      </div>
      {/* Account Settings */}
      <div className="flex items-center justify-between py-4 px-12 border-2 rounded-lg border-red-400">
        <div className="flex flex-col items-center">
          <ProfileIcon className={""} />
        </div>
        <p>Account Settings</p>
        <IoIosArrowForward size={25} />
      </div>
      {/* My Bookings */}

      <div
        onClick={() => router.push("/mybookings")}
        className="flex items-center justify-between py-4 px-12 border-2 rounded-lg border-red-400"
      >
        <div className="flex flex-col items-center">
          <BookingsIcon className={""} />
        </div>
        <p>My Bookings</p>
        <IoIosArrowForward size={25} />
      </div>
      {/* Navigation Bottom */}
      <NavigationBottom />
    </div>
  );
};

export default ProfilePage;
