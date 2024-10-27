"use client";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { IoCloseCircle } from "react-icons/io5";
import NavigationBottom from "../components/NavigationBottom";
import Header from "../components/Header";

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
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [hasBookings, setHasBookings] = useState(false); // Check if user has bookings
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingIdFromUrl = searchParams.get("bookingId");
  const [bookingId, setBookingId] = useState<string | null>(bookingIdFromUrl);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // If bookingId is not set, try retrieving from localStorage
        if (!bookingId) {
          const savedBookingId = localStorage.getItem("currentBookingId");
          setBookingId(savedBookingId);
        }

        // If we have a bookingId, fetch the booking details
        if (bookingId) {
          localStorage.setItem("currentBookingId", bookingId);
          await fetchUserBookings(bookingId);
        } else {
          setLoading(false); // Stop loading if no booking ID is found
        }
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [bookingId]);

  // Fetch user bookings from Firestore
  const fetchUserBookings = async (id: string) => {
    try {
      setLoading(true); // Set loading state to true when starting the fetch
      // Step 1: Fetch the booking details
      const bookingDocRef = doc(db, "bookings", id);
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
      } else {
        setHasBookings(false);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching
    }
  };

  const clearBookingState = () => {
    setBookingData(null);
    setPackageData(null);
    setHousingData(null);
    setHasBookings(false);
    localStorage.removeItem("currentBookingId");
    setBookingId(null);
  };

  const handleDeleteBooking = async () => {
    if (bookingId) {
      try {
        // Delete the booking document from Firestore
        await deleteDoc(doc(db, "bookings", bookingId));
        localStorage.removeItem("currentBookingId");
        clearBookingState();
        // Redirect to the home page
        router.push("/");
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleConfirmBooking = async () => {
    if (bookingId) {
      try {
        // Update the booking status to "booked" in Firestore
        await updateDoc(doc(db, "bookings", bookingId), {
          status: "booked",
        });
        clearBookingState();
        // Redirect to the payment confirmation page or wherever necessary
        router.push("/paymentmethod");
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !hasBookings) {
    return (
      <div className="w-full mx-auto text-center">
        <Header />

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
        <NavigationBottom />
      </div>
    );
  }

  const totalCost =
    (bookingData?.price ?? 0) + (bookingData?.housingPrice ?? 0);

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4">
      <div className="flex justify-items-center justify-between ">
        <IoCloseCircle size={40} onClick={handleDeleteBooking} />

        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      </div>

      {/* Package Section */}
      {packageData && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Package</h2>
          <div className="border rounded-lg p-4">
            <img
              src={packageData.image}
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
              src={housingData.images[0]}
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

      {/* Confirm Booking Button */}
      <div className="mt-6 mb-10">
        <button
          className="w-full bg-green-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-600"
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </button>
      </div>
      <NavigationBottom />
    </div>
  );
};

export default CheckoutPage;
