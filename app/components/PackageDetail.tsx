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
        {/* GoBack Icon */}
        <div className="absolute top-2 left-2">
          <button onClick={onGoBack}>
            <IoArrowBackCircle size={45} fill="white" />
          </button>
        </div>

        <img
          src={packageData.image}
          alt={packageData.title}
          className="rounded-md object-cover w-full h-56 mb-4"
        />
      </div>

      <div className="flex justify-between items-start">
        <h1 className="text-xl font-extrabold ">{packageData.title}</h1>
        <span className="font-extrabold text-gray-400">
          {packageData.bookingDate}
        </span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-lg font-semibold">${packageData.price} per person</p>
      </div>

      <p className="mt-4 text-gray-700">{packageData.description}</p>

      {/* Conditionally render Highlights */}
      {packageData.highlights && packageData.highlights.length > 0 && (
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
      )}

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Location:</h3>
        {packageData.locationMap && (
          <img
            src={packageData.locationMap}
            alt="Map"
            className="rounded-md object-cover w-full h-40"
          />
        )}
      </div>

      <div className="mt-6 mb-20">
        <button className="w-full bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageDetail;
