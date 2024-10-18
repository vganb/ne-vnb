import React from "react";
import ElkLogo from "./ElkLogo";
import NavigationTop from "./NavigationTop";
import Link from "next/link";

const Header = () => {
  return (
    // Logo and text
    <div className="flex justify-between items-center h-20 px-4 bg-orange-100 w-full">
      <Link href="/">
        <div className="flex items-center gap-2">
          <ElkLogo />
          <div className="text-xl text-black font-semibold w-10">
            Nordic Experiences
          </div>
        </div>
      </Link>

      {/* NavigationTop  */}
      <div className="">
        <NavigationTop />
      </div>
    </div>
  );
};

export default Header;
