import React from "react";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";

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
  startDate?: string;
  status: string;
  endDate?: string;
  createdAt?: string;
  deleteBooking: () => Promise<void>; // Add deleteBooking as a prop
}

const BookingCard: React.FC<BookingProps> = ({
  type,
  packageData,
  housingData,
  startDate,
  endDate,
  deleteBooking,
}) => {
  const packageImage = packageData?.image;
  const housingImage = housingData?.images[0];

  const displayDate =
    startDate && endDate
      ? `${startDate.slice(0, 10)} - ${endDate.slice(0, 10)}`
      : "Dates not available";

  return (
    <div className="p-4 bg-white rounded-lg border-2 shadow-md mb-6 ">
      {/* Display Booking Date and Status */}
      <div className="flex justify-between items-center text-gray-600 text-xs mb-2">
        <div>
          <strong>Booking Date:</strong> {displayDate}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div>
              <IoCloseCircle size={40} className="cursor-pointer" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                booking.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="outline">Cancel</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant="destructive" onClick={deleteBooking}>
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="flex justify-between"></div>

      {/* Package Section */}
      {type === "package" || type === "combined" ? (
        <div className="mb-6">
          {/* Package Image */}
          {packageImage && (
            <div className="relative">
              <Image
                src={packageImage}
                alt={`${packageData?.title} image`}
                width={1920} // Width in pixels (adjust based on actual image size)
                height={1080} // Height in pixels (adjust based on actual image size)
                priority
                className="w-full h-48 object-cover rounded-t-lg"
                // layout="responsive"
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
              <Image
                src={housingImage}
                alt={`${housingData?.title} image`}
                width={1920} // Width in pixels (adjust based on actual image size)
                height={1080}
                priority
                className="w-full h-48 object-fill rounded-t-lg"
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
