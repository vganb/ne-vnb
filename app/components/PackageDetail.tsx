import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";

// Import the PackageData interface from where you defined it
import { PackageData } from "../../lib/types"; // Ensure the path is correct

// Define the props for the PackageDetail component
interface PackageDetailProps {
  packageData: PackageData; // Type for packageData
  onGoBack: () => void; // Function type for onGoBack
}

const PackageDetail: React.FC<PackageDetailProps> = ({
  packageData,
  onGoBack,
}) => {
  if (!packageData) {
    return <div>Package not found!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4">
      <div className="relative w-full">
        {/* Go Back Icon */}
        <div className="absolute top-2 left-2 z-10">
          <button onClick={onGoBack}>
            <IoArrowBackCircle size={45} fill="white" />
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
        <h1 className="text-xl font-extrabold">{packageData.title}</h1>
        <span className="text-sm font-bold text-gray-400">
          {/* {packageData.duration} */}3 days
        </span>
      </div>

      {/* Price and Rating */}
      <div className="flex justify-between items-center mt-2">
        <p className="text-lg font-semibold">${packageData.price} per Person</p>
        <div className="flex items-center font-semibold">
          <span className="text-yellow-500 mr-1">★ {packageData.rating}</span>
          <span className="text-gray-500">({packageData.reviews})</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700">{packageData.description}</p>

      {/* Highlights Section */}
      {packageData.highlights && packageData.highlights.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Highlights:</h3>
          <div className="flex flex-wrap gap-2">
            {packageData.highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-bold"
              >
                ✅ {highlight}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Location Map */}
      {packageData.locationMap && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Locations:</h3>
          <img
            src="https://www.stockholmlgbt.com/wp-content/uploads/2018/01/StockholmMapGraphic.png"
            alt="Map of location"
            className="rounded-md object-cover w-full h-40"
          />
        </div>
      )}

      {/* Book Button */}
      <div className="mt-6 mb-20">
        <button className="w-full bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600">
          Book
        </button>
      </div>
    </div>
  );
};

export default PackageDetail;
