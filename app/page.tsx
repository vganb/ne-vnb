import React from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";
import DatePickerWithRange from "./components/DatePicker";
import CardIntro from "./components/CardIntro";
import HorizontalScrollbarPage from "./components/HorizontalScrollbarPage";

interface Category {
  name: string;
}

const categories: Category[] = [
  {
    name: "Historical",
  },
  {
    name: "Food",
  },
  {
    name: "Music",
  },
  {
    name: "Adventure & Outdoor",
  },
  {
    name: "Art & Culture",
  },
  {
    name: "Nature & Wildlife",
  },
  {
    name: "Sports",
  },
  {
    name: "Wellness",
  },
  {
    name: "Nightlife",
  },
  {
    name: "Technology",
  },
  {
    name: "Photography",
  },
  {
    name: "Shopping",
  },
  {
    name: "Architecture",
  },
  {
    name: "Festivals",
  },
  {
    name: "Luxury Travel",
  },
  {
    name: "Spiritual Retreats",
  },
  {
    name: "Volunteering",
  },
];

function Home() {
  return (
    <div className="min-w-320px">
      <Header />
      <div className="px-2 mt-4 grid gap-4 place-items-center">
        <DropdownFilter />
        <DatePickerWithRange />
      </div>
      <div className="flex flex-col mx-auto mt-8 py-4 items-center border-2 rounded-lg w-[400px]">
        <h1 className="font-semibold">Packages</h1>
        <p>Ready to go travel packages, get yours today!</p>
        <CardIntro />
      </div>
      <div className="bg-green-200  rounded-lg mt-4 mx-12 p-1">
        <HorizontalScrollbarPage>
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-2 bg-green-300 border-2 border-gray-900 rounded-lg text-center shrink-0 hover:border-gray-400"
            >
              {category.name}
            </div>
          ))}
        </HorizontalScrollbarPage>{" "}
      </div>
    </div>
  );
}

export default Home;
