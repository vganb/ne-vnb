"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { getHousingById } from "../../../lib/firestore";
import { Housing } from "../../../lib/types";
import NavigationBottom from "@/app/components/NavigationBottom";
import { useBookingContext } from "../../../context/BookingContext"; // Use the booking context
import { doc, updateDoc } from "firebase/firestore"; // Import Firestore update functionality
import { db } from "../../../lib/firebase"; // Adjust the path based on your folder structure
import { useToast } from "@/hooks/use-toast";

const HousingDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [housingDetail, setHousingDetail] = useState<Housing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { bookingId } = useBookingContext(); // Get booking ID from the context
  const { toast } = useToast();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      const fetchHousingDetail = async () => {
        try {
          const data = await getHousingById(id);
          setHousingDetail(data);
          if (data && data.images.length > 0) {
            setCurrentImageIndex(0);
          }
        } catch (error) {
          console.error("Error fetching housing data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchHousingDetail();
    }
  }, [id]);

  if (loading) {
    return <div>Loading housing details...</div>;
  }

  if (!housingDetail) {
    return <div>Housing not found</div>;
  }

  const handleBookHousing = async () => {
    if (bookingId) {
      try {
        const bookingDocRef = doc(db, "bookings", bookingId);
        await updateDoc(bookingDocRef, {
          housingId: housingDetail.id,
          housingTitle: housingDetail.title,
          housingPrice: housingDetail.price,
          housingHost: housingDetail.host,
          housingCity: housingDetail.city,
        });

        router.push(`/checkout?bookingId=${bookingId}`);
      } catch (error) {
        console.error("Error updating booking with housing: ", error);
      }
    } else {
      console.error("No bookingId found");
      toast({
        description: "You need to login to book a package and housing!",
      });
    }
  };

  return (
    <div className="relative max-w-lg mx-auto">
      <div className="absolute top-4 left-4 z-10">
        <IoArrowBackCircle
          onClick={() => router.back()}
          size={40}
          fill="white"
        />
      </div>

      <div className="relative">
        <img
          src={housingDetail.images[currentImageIndex]}
          alt={housingDetail.title}
          className="object-cover w-full h-60 mb-4 cursor-pointer"
          onClick={() =>
            setCurrentImageIndex((prevIndex) =>
              prevIndex === housingDetail.images.length - 1 ? 0 : prevIndex + 1
            )
          }
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {housingDetail.images.length}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{housingDetail.title}</h1>
          <p className="text-orange-500 font-semibold">
            ${housingDetail.price}/night
          </p>
        </div>
        <p className="text-gray-500">{housingDetail.city}</p>

        <p className="text-gray-500 mt-1">
          Rooms {housingDetail.rooms} Beds {housingDetail.beds} Bathroom{" "}
          {housingDetail.bathroom}
        </p>
        <p className="mt-4 text-gray-700">{housingDetail.description}</p>

        <div className="mt-6 bg-orange-100 py-1 px-6 shadow-md flex justify-between items-center">
          <p className="text-2xl font-bold">${housingDetail.price}</p>
          <button
            onClick={handleBookHousing}
            className="bg-orange-500 text-white px-20 py-3 rounded-md font-semibold"
          >
            Book
          </button>
        </div>
      </div>
      <NavigationBottom />
    </div>
  );
};

export default HousingDetailPage;
