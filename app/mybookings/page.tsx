"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import NavigationBottom from "../components/NavigationBottom";
import BookingCard from "../components/BookingCard";
import { fetchBookings } from "../../lib/firestore";
import { auth } from "@/lib/firebase";

// Modify the EnrichedBookingData interface to allow null values for packageData and housingData
interface EnrichedBookingData {
  id: string;
  packageData?: {
    title: string;
    city: string;
    description: string;
    price: number;
    image: string;
    tag: string;
    highlights?: string[];
    rating?: number;
    reviews?: number;
  } | null; // Allow null

  housingData?: {
    title: string;
    city: string;
    description: string;
    price: number;
    images: string[];
    tag: string;
    rooms?: number;
    beds?: number;
    bathroom?: number;
    cancellationPolicy?: string;
  } | null; // Allow null

  status: string;
  createdAt: string;
  startDate?: string; // Add startDate
  endDate?: string; // Add endDate
}

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<EnrichedBookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        await loadUserBookings(user.uid);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserBookings = async (userId: string) => {
    try {
      setLoading(true);
      const userBookings = await fetchBookings(userId);
      setBookings(userBookings);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between items-center">
        <Header />
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">You are not logged in😔</h1>
          <p className="text-lg">Please log in to view your bookings.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 bg-orange-400 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-600"
          >
            Login
          </button>
        </div>
        <NavigationBottom />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-between items-center">
        <Header />
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">No bookings found😔</h1>
          <p className="text-lg">You have no bookings at the moment.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-600"
          >
            Browse Packages
          </button>
        </div>
        <NavigationBottom />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        <div className="space-y-6 pb-24">
          {bookings.map((booking, index) => (
            <BookingCard
              key={index}
              type={
                booking.packageData && booking.housingData
                  ? "combined"
                  : booking.packageData
                  ? "package"
                  : "housing"
              }
              packageData={booking.packageData || undefined}
              housingData={booking.housingData || undefined}
              status={booking.status}
              createdAt={booking.createdAt}
              startDate={booking.startDate} // Pass startDate to BookingCard
              endDate={booking.endDate} // Pass endDate to BookingCard
            />
          ))}
        </div>
      </div>
      <NavigationBottom />
    </>
  );
};

export default MyBookingsPage;
