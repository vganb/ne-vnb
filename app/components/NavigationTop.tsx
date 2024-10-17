"use client";
import React, { useState } from "react";
import PackageIcon from "./PackageIcon";
import HousingIcon from "./HousingIcon";
import CartIcon from "./CartIcon";
import ProfileIcon from "./ProfileIcon";

function NavigationTop() {
  const [activeIcon, setActiveIcon] = useState("package");

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
  };

  return (
    <div className="hidden sm:flex gap-6 justify-evenly items-center h-16">
      {/* Package Icon and Label */}
      <div
        className="cursor-pointer flex flex-col items-center justify-end"
        onClick={() => handleIconClick("package")}
      >
        <PackageIcon
          className={`icon ${
            activeIcon === "package" ? "text-orange-700" : "text-gray-400"
          }`}
        />
        <p
          className={`text-xs ${
            activeIcon === "package" ? "text-orange-700" : "text-gray-400"
          }`}
        >
          Packages
        </p>
      </div>
      {/* Housing Icon and Label */}
      <div
        className="cursor-pointer flex flex-col items-center justify-end"
        onClick={() => handleIconClick("housing")}
      >
        <HousingIcon
          className={`icon ${
            activeIcon === "housing" ? "text-orange-700" : "text-gray-400"
          }`}
        />
        <p
          className={`text-xs ${
            activeIcon === "housing" ? "text-orange-700" : "text-gray-400"
          }`}
        >
          Housing
        </p>
      </div>

      {/* Cart Icon and Label */}
      <div
        className="cursor-pointer flex flex-col items-center justify-end"
        onClick={() => handleIconClick("cart")}
      >
        <CartIcon
          className={`icon ${
            activeIcon === "cart" ? "text-orange-700" : "text-gray-400"
          }`}
        />
        <p
          className={`text-xs ${
            activeIcon === "cart" ? "text-orange-700" : "text-gray-400"
          }`}
        >
          Cart
        </p>
      </div>

      {/* Profile Icon and Label */}
      <div
        className="cursor-pointer flex flex-col items-center justify-end"
        onClick={() => handleIconClick("profile")}
      >
        <ProfileIcon
          className={`icon ${
            activeIcon === "profile" ? "text-orange-700" : "text-gray-400"
          }`}
        />
        <p
          className={`text-xs ${
            activeIcon === "profile" ? "text-orange-700" : "text-gray-400"
          }`}
        >
          Login
        </p>
      </div>
    </div>
  );
}

export default NavigationTop;
