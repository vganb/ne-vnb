"use client"; // Ensure this is a client-side component

import { useParams } from "next/navigation"; // Import useParams from next/navigation
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5"; // Back button icon
import { useRouter } from "next/navigation";
import { getHousingById } from "../../../lib/firestore"; // Import the Firestore helper
import { Housing } from "../../../lib/types"; // Import the Housing type

const HousingDetailPage = () => {
  const params = useParams(); // Use useParams to get the dynamic 'id' from URL
  const router = useRouter(); // For back navigation
  const [housingDetail, setHousingDetail] = useState<Housing | null>(null); // State for housing data
  const [loading, setLoading] = useState(true); // Loading state

  // Ensure the 'id' is treated as a string, not string[]
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      const fetchHousingDetail = async () => {
        try {
          const data = await getHousingById(id); // Fetch housing details by ID
          setHousingDetail(data); // Set the fetched housing data to state
        } catch (error) {
          console.error("Error fetching housing data:", error);
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      };

      fetchHousingDetail();
    }
  }, [id]); // Fetch data when 'id' changes

  if (loading) {
    return <div>Loading housing details...</div>; // Display loading state while fetching data
  }

  if (!housingDetail) {
    return <div>Housing not found</div>; // Display error if no housing data is found
  }

  return (
    <div className="relative max-w-lg mx-auto">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <IoArrowBackCircle
          onClick={() => router.back()}
          size={40}
          fill="white"
        />
      </div>

      {/* Main Image */}
      <div className="relative">
        <img
          src={housingDetail.images[0]}
          alt={housingDetail.title}
          className="object-cover w-full h-60 mb-4"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {/* Image indicators */}
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Title and Location */}
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{housingDetail.title}</h1>
          <p className="text-orange-500 font-semibold">
            ${housingDetail.price}/night
          </p>
        </div>
        <p className="text-gray-500">{housingDetail.city}</p>

        {/* Rooms Info */}
        <p className="text-gray-500 mt-1">Rooms 3 Beds 2 Bathroom 1</p>

        {/* Description */}
        <p className="mt-4 text-gray-700">{housingDetail.description}</p>

        {/* Host and Self Check-in */}
        <div className="mt-6">
          <p className="font-bold">Host</p>
          <p className="text-orange-500">{housingDetail.host}</p>
          <p className="font-bold mt-4">Self Check-in</p>
          <p>You can check in with the staff in the building.</p>
        </div>

        {/* Free Cancellation Info */}
        <div className="mt-4">
          <p className="font-bold">Free Cancellation One Week Prior</p>
          <p>Plan your stay with confidence, free cancellations available.</p>
        </div>

        {/* Price and Book Button */}
        <div className="fixed bottom-0 left-0 w-full bg-white py-4 px-6 shadow-md flex justify-between items-center">
          <p className="text-2xl font-bold">${housingDetail.price}</p>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default HousingDetailPage;
