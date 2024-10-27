"use client";
import { useRouter } from "next/navigation";
import NavigationBottom from "../components/NavigationBottom";

const ConfirmationPage = () => {
  const router = useRouter();
  const orderNumber = "AABBCC123"; // Replace with actual order number from your logic

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center">Order Completed</h1>
      </header>

      <div className="text-center mb-6">
        <p className="text-lg">Thank you for your order.</p>
        <p className="text-lg">
          You will receive the full booking information to your email shortly.
        </p>
        <p className="mt-4 text-lg font-bold">
          Your order number is: {orderNumber}
        </p>
      </div>

      <button
        className="w-3/4 bg-orange-500 text-white py-3 rounded-md text-lg font-semibold mb-10"
        onClick={() => router.push("/mybookings")}
      >
        My Bookings
      </button>

      <NavigationBottom />
    </div>
  );
};

export default ConfirmationPage;
