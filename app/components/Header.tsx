import React from "react";
import ElkLogo from "./ElkLogo";

const Header = () => {
  return (
    <div className="flex w-full gap-4 items-center h-20 px-4 bg-orange-100 ">
      <ElkLogo />
      <div className="text-xl text-black font-semibold w-10">
        Nordic Experiences
      </div>
    </div>
  );
};

export default Header;
