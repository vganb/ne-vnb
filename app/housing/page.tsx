"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HousingCard from "../components/HousingCard";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation"; // Hook to access query parameters
import { getHousing } from "../../lib/firestore"; // Firestore fetch function
import { Housing } from "../../lib/types"; // Housing type
import { useBookingContext } from "../../context/BookingContext"; // Booking context

const HousingList = () => {
  const [housingList, setHousingList] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); // Access URL search parameters

  // Get bookingId from context and also define setter from context
  const { bookingId, setBookingId } = useBookingContext();

  // Extract bookingId from the URL (if available)
  const bookingIdFromUrl = searchParams.get("bookingId");

  useEffect(() => {
    // Set bookingId from URL to context if it's available
    if (bookingIdFromUrl && !bookingId) {
      setBookingId(bookingIdFromUrl);
    }

    // Fetch housing data
    const fetchHousingData = async () => {
      const housingData = await getHousing(); // Fetch housing data from Firestore
      setHousingList(housingData); // Set the fetched data in state
      setLoading(false); // Stop loading
    };

    fetchHousingData();
  }, [bookingIdFromUrl, bookingId, setBookingId]); // Fetch data once on component mount

  // Handler for skipping housing selection and going straight to checkout
  const handleSkipHousing = () => {
    if (bookingId) {
      router.push(`/checkout?bookingId=${bookingId}`); // Navigate to checkout with bookingId
    } else {
      console.error("No bookingId found");
    }
  };

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
        {/* Skip Housing Button */}
        <button
          onClick={handleSkipHousing}
          className="py-3 px-8 rounded-lg text-white font-bold bg-orange-400"
        >
          Skip housing
        </button>
        <p className="mt-2 text-lg font-semibold">Available Apartments</p>
      </div>

      {/* Display list of apartments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {housingList.map((housing) => (
          <HousingCard
            key={housing.id}
            id={housing.id}
            title={housing.title}
            city={housing.city}
            price={housing.price}
            rating={housing.rating || 0}
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
