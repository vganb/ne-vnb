import React from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";
import DatePickerWithRange from "./components/DatePicker";
import CardIntro from "./components/CardIntro";
import HorizontalScrollbarPage from "./components/HorizontalScrollbarPage";
import NavigationBottom from "./components/NavigationBottom";
import PackageCard from "./components/PackageCard";
import NavigationTop from "./components/NavigationTop";

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

interface Package {
  title: string;
  city: string;
  description: string;
  price: number;
  tag: string;
  image: string;
}

const packages: Package[] = [
  {
    title: "Historical Tour",
    city: "Stockholm",
    description: "Explore the rich history of Stockholm with a guided tour.",
    price: 200,
    tag: "History",
    image: "https://www.forskning.se/app/uploads/2024/02/Vasaskeppet.jpg",
  },
  {
    title: "Food Tour",
    city: "Copenhagen",
    description: "Discover the best local food spots in Copenhagen.",
    price: 150,
    tag: "Food",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&fit=crop&w=1050&h=700",
  },
  {
    title: "Music Experience",
    city: "Helsinki",
    description: "Enjoy the local music scene in Helsinki.",
    price: 120,
    tag: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&fit=crop&w=1050&h=700",
  },
  {
    title: "Music Experience",
    city: "Helsinki",
    description: "Enjoy the local music scene in Helsinki.",
    price: 120,
    tag: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&fit=crop&w=1050&h=700",
  },
  {
    title: "Music Experience",
    city: "Helsinki",
    description: "Enjoy the local music scene in Helsinki.",
    price: 120,
    tag: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&fit=crop&w=1050&h=700",
  },
  {
    title: "Music Experience",
    city: "Helsinki",
    description: "Enjoy the local music scene in Helsinki.",
    price: 120,
    tag: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&fit=crop&w=1050&h=700",
  },
  {
    title: "Music Experience",
    city: "Helsinki",
    description: "Enjoy the local music scene in Helsinki.",
    price: 120,
    tag: "Music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&fit=crop&w=1050&h=700",
  },
  // Add more packages here
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

      {/* Responsive grid layout for PackageCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            title={pkg.title}
            city={pkg.city}
            description={pkg.description}
            price={pkg.price}
            tag={pkg.tag}
            image={pkg.image}
          />
        ))}
      </div>

      <div className="">
        <NavigationBottom />
      </div>
      {/* min-w-320px */}
    </div>
  );
}

export default Home;
