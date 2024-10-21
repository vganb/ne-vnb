"use client"; // Ensure this is a client-side component

import { useParams } from "next/navigation"; // Import useParams from next/navigation
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5"; // Back button icon
import { useRouter } from "next/navigation";

interface HousingDetail {
  title: string;
  city: string;
  price: number;
  description: string;
  image: string;
  tag: string;
  host: string;
}

const HousingDetailPage = () => {
  const { id } = useParams(); // Use useParams to get the dynamic 'id'
  const router = useRouter(); // For back navigation
  const [housingDetail, setHousingDetail] = useState<HousingDetail | null>(
    null
  );

  useEffect(() => {
    if (id) {
      // Fetch housing details based on the ID
      const fetchHousingDetail = async () => {
        // Simulated fetch (replace this with real API call)
        const housingData = {
          title: "Lorensbergsgatan 1 B",
          city: "Hornstull, Stockholm",
          price: 230,
          description: `At the top of the building, you will find this fantastic 2-bedroom apartment with a wonderful and open view over Pålsundet towards Långholmen and a south-facing balcony overlooking the courtyard...`,
          image:
            "https://a0.muscache.com/im/pictures/miso/Hosting-713793474951553871/original/2ac03203-3d06-441c-bc82-77f28ac26c6a.jpeg?im_w=960",
          tag: "For Rent",
          host: "Johan",
        };

        // Simulate a delay to show loading state
        setTimeout(() => {
          setHousingDetail(housingData); // Fetch this data dynamically using 'id'
        }, 1000); // Simulate network delay
      };

      fetchHousingDetail();
    }
  }, [id]); // Ensure useEffect triggers whenever 'id' changes

  if (!id) {
    return <div>Loading ID...</div>; // Loading state for when the 'id' is not yet available
  }

  if (!housingDetail) {
    return <div>Loading housing details...</div>; // Loading state while fetching data
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
          src={housingDetail.image}
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
      <div className=" max-w-lg mx-auto px-4">
        {/* Title and Location */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{housingDetail.title}</h1>
          <p className="text-orange-500 font-semibold">
            ${housingDetail.price}/night
          </p>
        </div>
        <p className="text-gray-500">Hornstull, Stockholm</p>

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

        {/* User Reviews */}
        <div className="mt-6">
          <h3 className="font-bold text-xl">User Reviews</h3>
          <div className="flex items-center space-x-4 mt-4">
            <div className="rounded-full bg-gray-300 w-10 h-10"></div>
            <div>
              <p className="font-semibold">Liam</p>
              <p className="text-sm text-gray-500">★★★★★</p>
              <p className="text-gray-700">
                Enheten är exakt densamma som det som har illustrerats, rent och
                bekvämt...
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 mb-20">
            <div className="rounded-full bg-gray-300 w-10 h-10"></div>
            <div>
              <p className="font-semibold">Amanda</p>
              <p className="text-sm text-gray-500">★★★★☆</p>
              <p className="text-gray-700">
                Sammantaget en ganska bra vistelse. Bra läge, elegant
                inredning...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousingDetailPage;
