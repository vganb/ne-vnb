import React from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";

function Home() {
  return (
    <div>
      <Header />
      <div className="px-2 mt-4">
        <DropdownFilter />
      </div>
    </div>
  );
}

export default Home;
