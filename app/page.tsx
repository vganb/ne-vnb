"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import DropdownFilter from "./components/DropdownFilter";
import DatePickerWithRange from "./components/DatePicker";
import CardIntro from "./components/CardIntro";
import NavigationBottom from "./components/NavigationBottom";
import { getPackages } from "../lib/firestore";
import { Package } from "../lib/types";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./components/LoadingSpinner";
import PackageList from "./components/PackageList";
import CategoryFilter from "./components/CategoryFilter";

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
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
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
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {/* Responsive grid layout for PackageCard */}
      <PackageList
        packages={filteredPackages}
        onPackageClick={handlePackageClick}
      />
      <div className="">
        <NavigationBottom />
      </div>
    </div>
  );
}

export default Home;
