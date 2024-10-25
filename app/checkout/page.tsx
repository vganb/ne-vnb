"use client";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import NavigationBottom from "../components/NavigationBottom";

interface PackageData {
  title: string;
  price: number;
  image: string;
  description: string;
}

interface HousingData {
  title: string;
  price: number;
  images: string[];
  description: string;
  city?: string;
  host?: string;
}

interface BookingData {
  packageId: string;
  housingId?: string;
  price: number;
  housingPrice?: number;
}

const CheckoutPage = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [housingData, setHousingData] = useState<HousingData | null>(null);
  // Booking data type
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [hasBookings, setHasBookings] = useState(false); // Check if user has bookings
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        await fetchUserBookings(user.uid);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [bookingId]);

  // Fetch user bookings from Firestore
  const fetchUserBookings = async (userId: string) => {
    if (bookingId) {
      try {
        // Step 1: Fetch the booking details
        const bookingDocRef = doc(db, "bookings", bookingId);
        const bookingDoc = await getDoc(bookingDocRef);

        if (bookingDoc.exists()) {
          const bookingData = bookingDoc.data() as BookingData;
          setBookingData(bookingData);
          setHasBookings(true);

          // Step 2: Fetch the package data using the packageId from the booking
          if (bookingData.packageId) {
            const packageDocRef = doc(db, "packages", bookingData.packageId);
            const packageDoc = await getDoc(packageDocRef);
            if (packageDoc.exists()) {
              setPackageData(packageDoc.data() as PackageData);
            }
          }

          // Step 3: Fetch the housing data using the housingId from the booking (if available)
          if (bookingData.housingId) {
            const housingDocRef = doc(db, "housing", bookingData.housingId);
            const housingDoc = await getDoc(housingDocRef);
            if (housingDoc.exists()) {
              setHousingData(housingDoc.data() as HousingData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // If no specific bookingId, check for any existing bookings for the user
      const userBookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(userBookingsQuery);

      if (!querySnapshot.empty) {
        const firstBooking = querySnapshot.docs[0].data() as BookingData;
        setBookingData(firstBooking);
        setHasBookings(true);

        // Fetch package data for the first booking
        if (firstBooking.packageId) {
          const packageDocRef = doc(db, "packages", firstBooking.packageId);
          const packageDoc = await getDoc(packageDocRef);
          if (packageDoc.exists()) {
            setPackageData(packageDoc.data() as PackageData);
          }
        }

        // Fetch housing data for the first booking (if available)
        if (firstBooking.housingId) {
          const housingDocRef = doc(db, "housing", firstBooking.housingId);
          const housingDoc = await getDoc(housingDocRef);
          if (housingDoc.exists()) {
            setHousingData(housingDoc.data() as HousingData);
          }
        }
      } else {
        setHasBookings(false);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !hasBookings) {
    return (
      <div className="max-w-2xl mx-auto mt-6 p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg">
          {isAuthenticated
            ? "You have not booked any packages yet."
            : "Please log in to view your cart."}
        </p>
        <button
          onClick={() => router.push(isAuthenticated ? "/" : "/login")}
          className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-600"
        >
          {isAuthenticated ? "Browse Packages" : "Login"}
        </button>
      </div>
    );
  }

  const totalCost =
    (bookingData?.price ?? 0) + (bookingData?.housingPrice ?? 0);

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {/* Package Section */}
      {packageData && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Package</h2>
          <div className="border rounded-lg p-4">
            <img
              src={packageData.image} // Display the package image from the package data
              alt={packageData.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{packageData.title}</h3>
            <p className="text-orange-500 text-2xl font-bold mb-2">
              ${packageData.price} <span className="text-sm">Per person</span>
            </p>
            <p className="text-gray-500">{packageData.description}</p>
          </div>
        </div>
      )}

      {/* Housing Section (if booked) */}
      {housingData && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Housing</h2>
          <div className="border rounded-lg p-4">
            <img
              src={housingData.images[0]} // Display the housing image from the housing data
              alt={housingData.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{housingData.title}</h3>
            <p className="text-orange-500 text-2xl font-bold mb-2">
              ${housingData.price} <span className="text-sm">Per night</span>
            </p>
            <p className="text-gray-500">{housingData.description}</p>
          </div>
        </div>
      )}

      {/* Total Cost */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total Cost</h2>
        <p className="text-2xl font-bold">${totalCost}</p>
      </div>

      {/* Conditional Buttons */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Display "Continue to Book Housing" only if housing is not booked yet */}
        {!housingData && (
          <button
            className="w-full bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
            onClick={() => router.push("/housing")}
          >
            Continue to Book Housing
          </button>
        )}

        {/* Display "Confirm Booking" button for both scenarios */}
        <button
          className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600 mb-16"
          onClick={() => router.push("/confirmation")}
        >
          Confirm Booking
        </button>
      </div>
      <NavigationBottom />
    </div>
  );
};

export default CheckoutPage;
