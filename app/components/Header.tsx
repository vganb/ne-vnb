import React from "react";
import NeLogo from "./NeLogo";

const Header = () => {
  return (
    <div className="flex gap-4 items-center border-4 border-red-900 h-20 rounded-md px-4 bg-orange-100">
      <NeLogo />
      <div className="text-xl text-black font-semibold w-32">
        Nordic Experiences
      </div>
      <div>PROFILE</div>
      <div>PROFILE</div>
    </div>
  );
};

export default Header;
