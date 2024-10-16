import React from "react";
import ElkLogo from "./ElkLogo";

const Header = () => {
  return (
    <div className="flex w-full gap-4 items-center border-4 border-red-900 h-20 rounded-md px-4 bg-orange-100 ">
      <ElkLogo />
      <div className="text-xl text-black font-semibold w-32">
        Nordic Experiences
      </div>
    </div>
  );
};

export default Header;
