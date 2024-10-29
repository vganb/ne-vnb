"use client";
import React, { useEffect, useState } from "react";
import PackageIcon from "./PackageIcon";
import HousingIcon from "./HousingIcon";
import CartIcon from "./CartIcon";
import ProfileIcon from "./ProfileIcon";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for App Router

function NavigationTop() {
  const [activeIcon, setActiveIcon] = useState("package");
  const { user, logout } = useAuth(); // Get the user and logout function from AuthContext
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current route

  useEffect(() => {
    if (pathname.includes("housing")) {
      setActiveIcon("housing");
    } else if (pathname.includes("checkout")) {
      setActiveIcon("cart");
    } else if (pathname.includes("profile") || pathname.includes("login")) {
      setActiveIcon("profile");
    } else {
      setActiveIcon("package"); // Default to "package" if no specific route
    }
  }, [pathname]);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
  };

  const handleProfileClick = async () => {
    if (user) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="hidden sm:flex gap-10 justify-evenly items-center h-16">
      {/* Package Icon and Label */}
      <Link href={"/"}>
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
      </Link>
      {/* Housing Icon and Label */}
      <Link href={"/housing"}>
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
      </Link>

      {/* Cart Icon and Label */}
      <Link href={"/checkout"}>
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
      </Link>

      {/* Profile Icon and Label */}
      <div
        className="cursor-pointer flex flex-col items-center justify-end"
        onClick={() => {
          handleIconClick("profile");
          handleProfileClick();
        }}
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
          {user ? "Profile" : "Login"}{" "}
        </p>
      </div>
    </div>
  );
}

export default NavigationTop;
