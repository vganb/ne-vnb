"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoCloseCircle } from "react-icons/io5";
import { useBookingContext } from "../../context/BookingContext";
import NavigationBottom from "../components/NavigationBottom";
import Header from "../components/Header";
import { db } from "../../lib/firebase";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

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
}

interface BookingData {
  packageId: string;
  housingId?: string;
  price: number;
  housingPrice?: number;
}

const CheckoutPage = () => {
  const { bookingId, setBookingId } = useBookingContext();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [housingData, setHousingData] = useState<HousingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Add state for success message
  const router = useRouter();

  useEffect(() => {
    if (bookingId) {
      fetchUserBookings(bookingId);
    } else {
      setLoading(false); // Stop loading if bookingId is null
    }
  }, [bookingId, setBookingId]);

  const fetchUserBookings = async (id: string) => {
    try {
      setLoading(true);
      const bookingDocRef = doc(db, "bookings", id);
      const bookingDoc = await getDoc(bookingDocRef);

      if (bookingDoc.exists()) {
        const data = bookingDoc.data() as BookingData;
        setBookingData(data);

        if (data.packageId) {
          const packageDocRef = doc(db, "packages", data.packageId);
          const packageDoc = await getDoc(packageDocRef);
          if (packageDoc.exists()) {
            setPackageData(packageDoc.data() as PackageData);
          }
        }

        if (data.housingId) {
          const housingDocRef = doc(db, "housing", data.housingId);
          const housingDoc = await getDoc(housingDocRef);
          if (housingDoc.exists()) {
            setHousingData(housingDoc.data() as HousingData);
          }
        }
      } else {
        setBookingData(null);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearBookingState = () => {
    setBookingData(null);
    setPackageData(null);
    setHousingData(null);
    setBookingId(null);
    setConfirmationMessage(""); // Clear any success message
  };

  const handleDeleteBooking = async () => {
    if (bookingId) {
      try {
        await deleteDoc(doc(db, "bookings", bookingId));
        clearBookingState();
        router.push("/");
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleConfirmBooking = async () => {
    if (bookingId) {
      try {
        await updateDoc(doc(db, "bookings", bookingId), {
          status: "booked",
        });

        // Show success message
        setConfirmationMessage("Booking confirmed successfully!");

        // Clear booking state and redirect after a brief delay
        setTimeout(() => {
          clearBookingState();
          router.push("/paymentmethod"); // Redirect to home or another page
        }, 1000); // Delay of 1 second to show confirmation message
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!bookingId || !bookingData) {
    return (
      <div className="w-full mx-auto text-center">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg">Please log in to view your cart.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-orange-600"
        >
          Login
        </button>
        <NavigationBottom />
      </div>
    );
  }

  const totalCost = (bookingData.price ?? 0) + (bookingData.housingPrice ?? 0);

  return (
    <div className="max-w-2xl mx-auto mt-2 p-4">
      <div className="flex justify-between">
        <IoCloseCircle size={40} onClick={handleDeleteBooking} />
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      </div>

      {/* Success Message */}
      {confirmationMessage && (
        <div className="p-4 mb-4 text-green-800 bg-green-100 rounded-lg">
          {confirmationMessage}
        </div>
      )}

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

      {/* Housing Section */}
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
