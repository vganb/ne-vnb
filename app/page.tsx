"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";
import DatePickerWithRange from "./components/DatePicker";
import CardIntro from "./components/CardIntro";
import HorizontalScrollbarPage from "./components/HorizontalScrollbarPage";
import NavigationBottom from "./components/NavigationBottom";
import PackageCard from "./components/PackageCard";
import { getPackages } from "../lib/firestore";
import { Package } from "../lib/types";
import { useRouter } from "next/navigation";
import uploadHousingData from "./components/UploadingHousingData";
function Home() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // State for categories (tags)
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // State for selected category
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      const { packages, uniqueTags } = await getPackages(); // Fetch both packages and categories
      setPackages(packages);
      setCategories(["All", ...uniqueTags]); // Add "All" to the list of categories
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    const matchesCategory =
      selectedCategory === "All" || pkg.tag === selectedCategory;
    const matchesCity =
      selectedCities.length === 0 || selectedCities.includes(pkg.city);
    return matchesCategory && matchesCity;
  });

  const handlePackageClick = (id: string) => {
    router.push(`/package/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="px-2 mt-4 grid gap-4 place-items-center">
        <DropdownFilter
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
        <DatePickerWithRange />
      </div>
      <div className="w-full sm:w-[400px] flex flex-col mx-auto mt-4 py-4 items-center border-2 rounded-lg">
        <h1 className="font-semibold">Packages</h1>
        <p>Ready to go travel packages, get yours today!</p>
        <CardIntro />
      </div>
      {/* Horizontal scroll categories */}
      <div className="w-full sm:w-[400px] bg-orange-100 rounded-lg mt-4 mx-auto">
        <HorizontalScrollbarPage>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-1 bg-orange-300 border-2 border-gray-400 rounded-md text-center shrink-0 uppercase hover:bg-orange-400 cursor-pointer ${
                selectedCategory === category ? "bg-orange-500" : ""
              }`} // Highlight selected category
              onClick={() => setSelectedCategory(category)} // Set selected category on click
            >
              {category}
            </div>
          ))}
        </HorizontalScrollbarPage>
      </div>
      {/* Responsive grid layout for PackageCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id} // Use unique id from Firestore
            onClick={() => handlePackageClick(pkg.id)}
            className="cursor-pointer"
          >
            <PackageCard
              title={pkg.title}
              city={pkg.city}
              description={pkg.description}
              price={pkg.price}
              tag={pkg.tag}
              image={pkg.image}
            />
          </div>
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
