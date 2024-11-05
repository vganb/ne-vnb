"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HousingCard from "../components/HousingCard";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchBookingById,
  getHousing,
  getPackageById,
} from "../../lib/firestore";
import { Housing, PackageData } from "../../lib/types";
import { useBookingContext } from "../../context/BookingContext";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const HousingList = () => {
  const [housingList, setHousingList] = useState<Housing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); // client-side hook
  const { toast } = useToast();

  const { bookingId, setBookingId } = useBookingContext();
  const bookingIdFromUrl = searchParams.get("bookingId");

  useEffect(() => {
    if (bookingIdFromUrl && !bookingId) {
      setBookingId(bookingIdFromUrl);
    }
  }, [bookingIdFromUrl, bookingId, setBookingId]);

  useEffect(() => {
    const fetchHousingData = async () => {
      try {
        let housingData;

        if (bookingId) {
          const bookingDetails = await fetchBookingById(bookingId);
          if (!bookingDetails?.packageId)
            throw new Error("No package found for this booking.");

          const packageData: PackageData | null = await getPackageById(
            bookingDetails.packageId
          );
          if (!packageData?.city) throw new Error("Package city not found");

          // Fetch housing filtered by the city from the package
          housingData = await getHousing(packageData.city);
        } else {
          // Fetch all housings if no booking or package is selected
          housingData = await getHousing();
        }

        setHousingList(housingData);
      } catch (error) {
        console.error("Error fetching housing data:", error);
        toast({ description: "Error fetching housing data" });
      } finally {
        setLoading(false);
      }
    };

    fetchHousingData();
  }, [bookingId, toast]);

  const handleSkipHousing = () => {
    if (bookingId) {
      router.push(`/checkout?bookingId=${bookingId}`);
    } else {
      console.error("No bookingId found");
      router.push("/");
      toast({
        description: "You need to log in to continue the booking",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
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
