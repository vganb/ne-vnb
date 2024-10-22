import React from "react";
import { IoClose } from "react-icons/io5";
import PackageCard from "../components/PackageCard";
import { PackageCardProps } from "../../lib/types";
import NavigationBottom from "../components/NavigationBottom";

import HousingCard from "../components/HousingCard";

const CheckoutCart = ({ title, city, description, price, tag, image }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mt-4 px-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <IoClose size={40} />
      </div>
      {/* package section */}
      <div className="">
        <h2 className="mx-auto">Package</h2>
        <PackageCard
          title={title}
          city={city}
          description={description}
          price={price}
          tag={tag}
          image={image}
        />
      </div>
      {/* housing section */}
      <div className="mx-auto">
        <h2>Housing</h2>
      </div>
      <NavigationBottom />
    </div>
  );
};

export default CheckoutCart;
