import React from "react";
import Header from "../components/Header";
import HousingCard from "../components/HousingCard";
import NavigationBottom from "../components/NavigationBottom";

const HousingList = () => {
  return (
    <div>
      <Header />
      <HousingCard
        title={""}
        city={""}
        price={0}
        rating={0}
        description={""}
        tag={""}
        host={""}
        image={""}
      />
      <NavigationBottom />
    </div>
  );
};

export default HousingList;
