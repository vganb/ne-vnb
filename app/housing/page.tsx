"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HousingCard from "../components/HousingCard";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation"; // Hook to access query parameters
import {
  fetchBookingById,
  getHousing,
  getPackageById,
} from "../../lib/firestore"; // Firestore fetch function
import { Booking, Housing, PackageData } from "../../lib/types"; // Housing type
import { useBookingContext } from "../../context/BookingContext"; // Booking context
import { useToast } from "@/hooks/use-toast"; // Custom toast hook

const HousingList = () => {
  const [housingList, setHousingList] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); // Access URL search parameters
  const { toast } = useToast(); // Custom toast hook

  // Get bookingId from context and also define setter from context
  const { bookingId, setBookingId } = useBookingContext();

  // Extract bookingId from the URL (if available)
  const bookingIdFromUrl = searchParams.get("bookingId");

  // Set bookingId from URL on initial render if not already set
  useEffect(() => {
    if (bookingIdFromUrl && !bookingId) {
      setBookingId(bookingIdFromUrl);
    }
  }, [bookingIdFromUrl, bookingId, setBookingId]);

  useEffect(() => {
    const fetchHousingDataByCity = async () => {
      try {
        // Check if bookingId is now available
        if (!bookingId) {
          throw new Error("No booking ID found.");
        }

        const bookingDetails = await fetchBookingById(bookingId);
        if (!bookingDetails?.packageId)
          throw new Error("No package found for this booking.");

        // Fetch package details using packageId
        const packageData: PackageData | null = await getPackageById(
          bookingDetails.packageId
        );
        if (!packageData?.city) throw new Error("Package city not found");

        // Use the city from the package to filter housing
        const housingData = await getHousing(packageData.city);
        setHousingList(housingData);
      } catch (error) {
        console.error("Error fetching housing data:", error);
        toast({ description: "Error fetching housing data" });
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if bookingId is available
    if (bookingId) {
      fetchHousingDataByCity();
    }
  }, [bookingId, toast]);

  // Handler for skipping housing selection and going straight to checkout
  const handleSkipHousing = () => {
    if (bookingId) {
      router.push(`/checkout?bookingId=${bookingId}`); // Navigate to checkout with bookingId
    } else {
      console.error("No bookingId found");
      router.push("/"); // Navigate to home if no bookingId is found
      toast({
        description: "You need to login to continue the booking",
      });
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
