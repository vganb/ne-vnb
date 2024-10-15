import React from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";
import DatePickerWithRange from "./components/DatePicker";

function Home() {
  return (
    <div className="min-w-min">
      <Header />
      <div className="px-2 mt-4">
        <div className="sm:max-w-xl sm:mx-auto">
          <DropdownFilter />
          <DatePickerWithRange />
        </div>
      </div>
    </div>
  );
}

export default Home;
