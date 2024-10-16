import React from "react";
import PackageIcon from "./PackageIcon";
import HousingIcon from "./HousingIcon";
import CartIcon from "./CartIcon";
import ProfileIcon from "./ProfileIcon";

function NavigationBottom() {
  return (
    <div className="flex justify-evenly items-center border-4 border-purple-700 h-16">
      <PackageIcon />
      <HousingIcon />
      <CartIcon />
      <ProfileIcon />
    </div>
  );
}

export default NavigationBottom;
