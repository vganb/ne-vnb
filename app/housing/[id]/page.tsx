"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { getHousingById } from "../../../lib/firestore";
import { Housing } from "../../../lib/types";
import NavigationBottom from "@/app/components/NavigationBottom";
import { useBookingContext } from "../../../context/BookingContext";
import Image from "next/image";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const HousingDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [housingDetail, setHousingDetail] = useState<Housing | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { handleBookHousing } = useBookingContext();

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
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!housingDetail) {
    return <div>Housing not found</div>;
  }
  const bookHousing = () => {
    if (housingDetail) {
      handleBookHousing({
        id: housingDetail.id,
        title: housingDetail.title,
        price: housingDetail.price,
        host: housingDetail.host,
        city: housingDetail.city,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 ">
      <div className="relative mb-4">
        <IoArrowBackCircle
          onClick={() => router.back()}
          size={40}
          className="absolute top-4 left-4 text-white cursor-pointer"
          fill="orange"
        />
      </div>

      {/* Responsive image layout */}
      <div className="mb-6">
        {/* Carousel for mobile screens */}
        <div className="lg:hidden">
          <Image
            src={housingDetail.images[currentImageIndex]}
            alt={housingDetail.title}
            width={1920}
            height={1080}
            priority // This marks the image as high priority
            className="object-cover w-full h-60 mb-4 cursor-pointer rounded-md"
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === housingDetail.images.length - 1
                  ? 0
                  : prevIndex + 1
              )
            }
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {housingDetail.images.length}
          </div>
        </div>

        {/* Grid layout for larger screens */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {housingDetail.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              height={1080}
              width={1920}
              priority // This marks the image as high priority
              alt={`${housingDetail.title} - Image ${index + 1}`}
              className={`object-cover w-full rounded-md ${
                index === 0 ? "col-span-2 row-span-2 h-96" : "h-48"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-0">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{housingDetail.title}</h1>
          <p className="text-orange-500 font-semibold">
            ${housingDetail.price} / night
          </p>
        </div>
        <p className="text-gray-500">{housingDetail.city}</p>
        <p className="text-gray-500 mt-1">
          Rooms {housingDetail.rooms} • Beds {housingDetail.beds} • Bathroom{" "}
          {housingDetail.bathroom}
        </p>
        <p className="mt-4 text-gray-700">{housingDetail.description}</p>

        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-3/4 md:w-1/4 bg-orange-100 shadow-md flex justify-between items-center rounded-md px-4 py-2">
          <p className="text-2xl font-bold text-orange-600">
            ${housingDetail.price}
          </p>
          <button
            onClick={bookHousing}
            className="bg-orange-500 text-white px-10 py-2 rounded-md font-semibold text-lg hover:bg-orange-600 transition"
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
