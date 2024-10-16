"use client";
import React from "react";
import PackageIcon from "./PackageIcon";
import HousingIcon from "./HousingIcon";
import CartIcon from "./CartIcon";
import ProfileIcon from "./ProfileIcon";
import { useState } from "react";

function NavigationBottom() {
  const [activeIcon, setActiveIcon] = useState("package");

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
  };
  return (
    <div className="flex justify-evenly items-center border-4 border-purple-700 h-16">
      <div
        onClick={() => handleIconClick("package")}
        className="cursor-pointer"
      >
        <PackageIcon
          className={
            activeIcon === "package" ? "text-orange-700" : "text-gray-400"
          }
        />
      </div>
      <div
        onClick={() => handleIconClick("housing")}
        className="cursor-pointer"
      >
        <HousingIcon
          className={
            activeIcon === "housing" ? "text-orange-700" : "text-gray-400"
          }
        />
      </div>
      <div onClick={() => handleIconClick("cart")} className="cursor-pointer">
        <CartIcon
          className={
            activeIcon === "cart" ? "text-orange-700" : "text-gray-400"
          }
        />
      </div>
      <div
        onClick={() => handleIconClick("profile")}
        className="cursor-pointer"
      >
        <ProfileIcon
          className={
            activeIcon === "profile" ? "text-orange-700" : "text-gray-400"
          }
        />
      </div>
    </div>
  );
}

export default NavigationBottom;
