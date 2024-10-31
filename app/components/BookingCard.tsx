import React from "react";

interface PackageData {
  title: string;
  city: string;
  description: string;
  price: number;
  image: string; // Single image URL for package
  tag: string;
  highlights?: string[];
}

interface HousingData {
  title: string;
  city: string;
  description: string;
  price: number;
  images: string[]; // Array of images for housing, display the first one
}

interface BookingProps {
  type: "package" | "housing" | "combined";
  packageData?: PackageData;
  housingData?: HousingData;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

const BookingCard: React.FC<BookingProps> = ({
  type,
  packageData,
  housingData,
  status,
  createdAt,
  startDate,
  endDate,
}) => {
  // Choose images for package and housing
  const packageImage = packageData?.image;
  const housingImage = housingData?.images[0];

  const displayDate =
    startDate && endDate
      ? `${startDate.slice(0, 10)} - ${endDate.slice(0, 10)}`
      : "Dates not available";

  return (
    <div className="p-4 bg-white rounded-lg border-2 shadow-md mb-6 ">
      {/* Display Booking Date and Status */}
      <div className="text-gray-600 text-xs mb-2">
        <strong>Booking Date:</strong> {displayDate}
      </div>

      {/* Package Section */}
      {type === "package" || type === "combined" ? (
        <div className="mb-6">
          {/* Package Image */}
          {packageImage && (
            <div className="relative">
              <img
                src={packageImage}
                alt={`${packageData?.title} image`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {/* Tag Label */}
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {packageData?.tag}
              </span>
            </div>
          )}

          {/* Package Details */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">{packageData?.title}</h2>
            <p className="text-gray-600 text-sm mb-1">{packageData?.city}</p>
            <p className="text-amber-600 text-lg font-bold mb-2">
              ${packageData?.price}{" "}
              <span className="text-sm text-gray-500">Per person</span>
            </p>
            <p className="text-gray-800 font-medium">Includes:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {packageData?.highlights?.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Housing Section */}
      {type === "housing" || type === "combined" ? (
        <div>
          {/* Housing Image */}
          {housingImage && (
            <div className="relative">
              <img
                src={housingImage}
                alt={`${housingData?.title} image`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
          )}

          {/* Housing Details */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">{housingData?.title}</h2>
            <p className="text-gray-600 text-sm mb-1">{housingData?.city}</p>
            <p className="text-amber-600 text-lg font-bold mb-2">
              ${housingData?.price}{" "}
              <span className="text-sm text-gray-500">Per night</span>
            </p>
            <p className="text-gray-800 font-medium">Details:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {housingData?.description && <li>{housingData.description}</li>}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookingCard;
