"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";
import NavigationBottom from "./NavigationBottom";

// Simulate dynamic data
const packageData = {
  title: "Historical Tour in Stockholm",
  city: "Stockholm",
  description:
    "Experience a three-night journey to Stockholm, exploring two renowned museums and savoring two exquisite dinners. Discover the city's rich history and culture, while enjoying world-class dining and unforgettable experiences.",
  price: 700,
  duration: "3 days",
  rating: 4.5,
  reviews: 323,
  tag: "Cultural Tour",
  image:
    "https://www.visitstockholm.com/media/images/3de3712d1acc430b9dd18474832e441e.width-1280.jpg", // Example image path
  highlights: ["Guided tour", "Museum", "Monumental Sight"],
  locationMap:
    "https://www.stockholmlgbt.com/wp-content/uploads/2018/01/StockholmMapGraphic.png", // Example map image
};

const PackageDetailPage = () => {
  const router = useRouter();

  const handleBooking = () => {
    router.push(`/booking?package=${packageData.title}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4">
      {/* Main Image Container with GoBackIcon */}
      <div className="relative w-full">
        {/* GoBackIcon positioned on top of the image */}
        <div className="absolute top-2 left-2">
          <button onClick={() => router.back()}>
            <div className="pl-2">
              <IoArrowBackCircle size={45} fill="white" />
            </div>
          </button>
        </div>

        {/* Main Image */}
        <img
          src={packageData.image}
          alt={packageData.title}
          className="rounded-md object-cover w-full h-56 mb-4"
        />
      </div>

      {/* Title and Duration */}
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-extrabold ">{packageData.title}</h1>
        <span className="font-extrabold text-gray-400">
          {packageData.duration}
        </span>
      </div>

      {/* Price and Rating */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-lg font-semibold">${packageData.price} per person</p>
        <div className="flex items-center font-semibold">
          <span className="text-yellow-500 mr-1">★ {packageData.rating}</span>
          <span className="text-gray-500">({packageData.reviews})</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{packageData.description}</p>

      {/* Highlights Section */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Highlights:</h3>
        <div className="flex flex-wrap gap-2">
          {packageData.highlights.map((highlight, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              ✅ {highlight}
            </span>
          ))}
        </div>
      </div>

      {/* Location Map */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Locations:</h3>
        <img
          src={packageData.locationMap}
          alt="Map of Stockholm"
          className="rounded-md object-cover w-full h-40"
        />
      </div>

      {/* Book Button */}
      <div className="mt-6 mb-20">
        <button
          onClick={handleBooking}
          className="w-full bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
        >
          Book
        </button>
      </div>
      <div>
        <NavigationBottom />
      </div>
    </div>
  );
};

export default PackageDetailPage;
