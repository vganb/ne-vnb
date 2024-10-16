import React from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";
import DatePickerWithRange from "./components/DatePicker";
import CardIntro from "./components/CardIntro";
import HorizontalScrollbarPage from "./components/HorizontalScrollbarPage";
import { Navigation } from "lucide-react";
import NavigationBottom from "./components/NavigationBottom";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-2 mt-4 grid gap-4 place-items-center">
        <DropdownFilter />
        <DatePickerWithRange />
      </div>
      <div className="w-full sm:w-[400px] flex flex-col mx-auto mt-4 py-4 items-center border-2 rounded-lg">
        <h1 className="font-semibold">Packages</h1>
        <p>Ready to go travel packages, get yours today!</p>
        <CardIntro />
      </div>
      <div className="w-full sm:w-[400px] bg-orange-100  rounded-lg mt-4 mx-auto">
        <HorizontalScrollbarPage>
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-1 bg-orange-300 border-2 border-gray-400 rounded-md text-center shrink-0 lowercase hover:bg-orange-400"
            >
              {category.name}
            </div>
          ))}
        </HorizontalScrollbarPage>{" "}
      </div>
      <div className="mt-auto w-full">
        <NavigationBottom />
      </div>
      {/* min-w-320px */}
    </div>
  );
}

export default Home;
