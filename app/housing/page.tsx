"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HousingCard from "../components/HousingCard";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { getHousing } from "../../lib/firestore"; // Import the Firestore fetch function
import { Housing } from "../../lib/types"; // Import the Housing type

const HousingList = () => {
  const [housingList, setHousingList] = useState<Housing[]>([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHousingData = async () => {
      const housingData = await getHousing(); // Fetch housing data from Firestore
      setHousingList(housingData); // Set the fetched data in state
      setLoading(false); // Stop the loading indicator
    };

    fetchHousingData();
  }, []); // Fetch data only once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="mt-4 pl-1">
        <IoArrowBackCircle
          onClick={() => router.back()}
          size={40}
          fill="black"
        />
      </div>
      <div className="mx-auto">
        <button className="py-3 px-8 rounded-lg text-white font-bold bg-orange-400">
          Skip housing
        </button>
        <p className="mt-2 text-lg font-semibold">Available Apartments</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {housingList.map((housing) => (
          <HousingCard
            key={housing.id} // Use document id as the key
            id={housing.id} // Pass the id to the HousingCard component
            title={housing.title}
            city={housing.city}
            price={housing.price}
            rating={housing.rating || 0} // Optional rating (default to 0 if undefined)
            description={housing.description}
            tag={housing.tag}
            host={housing.host}
            images={[housing.images[0]]}
          />
        ))}
      </div>
      <NavigationBottom />
    </div>
  );
};

export default HousingList;
