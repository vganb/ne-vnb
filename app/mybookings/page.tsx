"use client";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import NavigationBottom from "../components/NavigationBottom";

interface BookingData {
  push(bookingData: BookingData): unknown;
  id: string;
  packageTitle: string;
  packageId: string;
  housingTitle?: string;
  housingId?: string;
  price: number;
  housingPrice?: number;
  status: string;
}

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

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
  }, []);

  const fetchUserBookings = async (userId: string) => {
    try {
      setLoading(true);
      const bookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", userId),
        where("status", "==", "booked") // Only fetch booked entries
      );
      const querySnapshot = await getDocs(bookingsQuery);
      const bookingsData: BookingData[] = [];
      querySnapshot.forEach((doc) => {
        const bookingData = {
          id: doc.id,
          ...doc.data(),
        } as BookingData;
        bookingsData.push(bookingData);
      });
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full mx-auto text-center">
        <Header />
        <h1 className="text-3xl font-bold mb-4">You are not logged in😔</h1>
        <p className="text-lg">Please log in to view your bookings.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 bg-orange-400 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-600"
        >
          Login
        </button>
        <NavigationBottom />
      </div>
    );
  }

  if (bookings.length === 0) {
    <div className="w-full mx-auto text-center">
      <Header />
      <h1 className="text-3xl font-bold mb-4">No bookings found😔</h1>
      <p className="text-lg">You have no bookings at the moment.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-600"
      >
        Browse Packages
      </button>
      <NavigationBottom />
    </div>;
  }
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto mt-6 p-4">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{booking.packageTitle}</h2>
              <p className="text-sm text-gray-600">
                Package ID: {booking.packageId}
              </p>
              {booking.housingTitle && (
                <>
                  <h3 className="text-lg font-medium mt-2">
                    {booking.housingTitle}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Housing ID: {booking.housingId}
                  </p>
                </>
              )}
              <p className="mt-2 text-orange-500 text-lg font-bold">
                Total Cost: ${booking.price + (booking.housingPrice || 0)}
              </p>
              <p className="text-sm mt-1 text-gray-500">
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>{" "}
        <NavigationBottom />
      </div>
    </>
  );
};

export default MyBookingsPage;
