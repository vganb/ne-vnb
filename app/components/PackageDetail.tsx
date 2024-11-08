import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { PackageData } from "../../lib/types";
import { useBookingContext } from "../../context/BookingContext"; // Import the booking context
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { addDays } from "date-fns";
import Image from "next/image";

// Define the props for the PackageDetail component
interface PackageDetailProps {
  packageData: PackageData | null; // Updated to accept null as initial state
  onGoBack: () => void;
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

console.log("Google Maps API Key:", googleMapsApiKey ? "Loaded" : "Not Loaded");

const cityMapUrls: { [key: string]: string } = {
  Stockholm: `https://maps.googleapis.com/maps/api/staticmap?center=Stockholm&zoom=12&size=600x300&key=${googleMapsApiKey}`,
  Oslo: `https://maps.googleapis.com/maps/api/staticmap?center=Oslo&zoom=12&size=600x300&key=${googleMapsApiKey}`,
  Helsinki: `https://maps.googleapis.com/maps/api/staticmap?center=Helsinki&zoom=12&size=600x300&key=${googleMapsApiKey}`,
  Copenhagen: `https://maps.googleapis.com/maps/api/staticmap?center=Copenhagen&zoom=12&size=600x300&key=${googleMapsApiKey}`,
};

const PackageDetail: React.FC<PackageDetailProps> = ({
  packageData,
  onGoBack,
}) => {
  const [userId, setUserId] = useState<string | null>(null); // Store the userId
  const [loading, setLoading] = useState(false); // Loading state for the booking
  const { setBookingId, bookingStartDate, bookingEndDate } =
    useBookingContext(); // Access context properties
  const { toast } = useToast(); // Get the toast function from useToast
  const router = useRouter();
  // Utility function to set a date to midnight UTC
  const setMidnightUTC = (date: Date): string => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate.toISOString(); // This ensures the date is stored as UTC midnight
  };

  const handleBookNow = async () => {
    if (!userId) {
      console.error("User is not authenticated!");
      toast({
        description: "You need to login to book a package!",
      });
      router.push("/");
      return;
    }

    setLoading(true);
    try {
      const bookingDate = {
        start: bookingStartDate
          ? setMidnightUTC(bookingStartDate)
          : setMidnightUTC(new Date()),
        end: bookingEndDate
          ? setMidnightUTC(bookingEndDate)
          : setMidnightUTC(addDays(new Date(), 3)),
      };

      const bookingRef = await addDoc(collection(db, "bookings"), {
        userId,
        packageId: packageData?.packageId,
        packageTitle: packageData?.title,
        price: packageData?.price,
        status: "pending",
        bookingDate, // Use the safe bookingDate object
        createdAt: new Date().toISOString(),
      });
      await updateDoc(doc(db, "bookings", bookingRef.id), {
        orderId: bookingRef.id,
      });

      toast({
        description: "Your package has been successfully booked!",
        duration: 3000,
      });

      setBookingId(bookingRef.id); // Save bookingId in context
      router.push(`/housing?bookingId=${bookingRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Loading state
  if (!packageData) {
    return <div>Loading package details...</div>;
  }

  const cityMapUrl = cityMapUrls[packageData.city] || "";

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
        <Image
          src={packageData.image}
          alt={packageData.title}
          width={1920}
          height={1080}
          className="rounded-md object-cover w-full h-56 mb-4"
        />
      </div>

      {/* Title and Duration */}
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-extrabold">{packageData.title}</h1>
        <span className="text-sm font-bold text-gray-400">
          {packageData.duration}
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
      {/* {packageData.locationMap && (
        <div className="mt-6 mb-20">
          <h3 className="text-lg font-bold mb-2">Locations:</h3>
          <Image
            src="https://www.stockholmlgbt.com/wp-content/uploads/2018/01/StockholmMapGraphic.png"
            alt="Map of location"
            height={1080}
            width={1920}
            className="rounded-md object-cover w-full h-40"
          />
        </div>
      )}   */}

      {cityMapUrl && (
        <div className="mt-6 mb-20">
          <h3 className="text-lg font-bold mb-2">Location Map:</h3>
          <img
            src={cityMapUrl}
            alt={`Map of ${packageData.city}`}
            height={1080}
            width={1920}
            className="rounded-md object-cover w-full h-40"
          />
        </div>
      )}
      {/* Book Button */}
      <div className="fixed md:static bottom-0 left-0 w-full max-w-2xl mx-auto px-4 py-2 bg-transparent">
        <button
          onClick={handleBookNow}
          className="w-full bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book"}
        </button>
      </div>
    </div>
  );
};

export default PackageDetail;
