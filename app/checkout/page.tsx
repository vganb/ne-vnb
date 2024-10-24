"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface BookingData {
  packageTitle: string;
  price: number;
  housingTitle?: string;
  housingPrice?: number;
  housingHost?: string;
  housingCity?: string;
}

const CheckoutPage = () => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null); // Booking data type
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  // Fetch booking details when bookingId is present
  useEffect(() => {
    const fetchBookingData = async () => {
      if (bookingId) {
        try {
          const bookingDocRef = doc(db, "bookings", bookingId);
          const bookingDoc = await getDoc(bookingDocRef);

          if (bookingDoc.exists()) {
            setBookingData(bookingDoc.data() as BookingData); // Cast data to BookingData
          } else {
            console.error("Booking not found");
          }
        } catch (error) {
          console.error("Error fetching booking data:", error);
        } finally {
          setLoading(false); // Stop loading when done
        }
      }
    };

    fetchBookingData();
  }, [bookingId]);

  // If data is still loading, show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no booking data is found, show an error message
  if (!bookingData) {
    return <div>Booking data not found!</div>;
  }

  // Calculate total cost
  const totalCost = bookingData.price + (bookingData.housingPrice || 0);

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {/* Package Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Package Details</h2>
        <p>
          <strong>Package:</strong> {bookingData.packageTitle}
        </p>
        <p>
          <strong>Price:</strong> ${bookingData.price}
        </p>
      </div>

      {/* Housing Details (if any) */}
      {bookingData.housingTitle && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Housing Details</h2>
          <p>
            <strong>Housing:</strong> {bookingData.housingTitle}
          </p>
          <p>
            <strong>Price:</strong> ${bookingData.housingPrice}
          </p>
          <p>
            <strong>Host:</strong> {bookingData.housingHost}
          </p>
          <p>
            <strong>City:</strong> {bookingData.housingCity}
          </p>
        </div>
      )}

      {/* Total Cost */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Total Cost</h2>
        <p className="text-2xl font-bold">${totalCost}</p>
      </div>

      {/* Confirm Button (Optional) */}
      <div className="mt-6">
        <button
          className="w-full bg-orange-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-orange-600"
          onClick={() => router.push("/confirmation")} // Example: Redirect to confirmation page after checkout
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
