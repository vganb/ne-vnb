"use client";
import { useState } from "react";
import NavigationBottom from "../components/NavigationBottom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    // Perform any necessary form validation or data handling here

    // Redirect to the confirmation page
    router.push("/confirmation");
  };

  return (
    <div
      suppressHydrationWarning
      className="w-2/3 md:w-2/5 mx-auto bg-white p-6 mb-10"
    >
      <header className="flex items-center justify-between mb-4">
        <IoArrowBackCircle size={38} onClick={() => router.back()} />
        <h1 className="text-xl font-semibold">Payment Methods</h1>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Personal Information Fields */}
        <input
          type="text"
          placeholder="Name"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="email"
          placeholder="Email"
          className="block w-full border border-gray-300 rounded-md p-3"
        />
        <input
          type="tel"
          placeholder="Phone number"
          className="block w-full border border-gray-300 rounded-md p-3"
        />

        {/* Payment Method Radio Options */}
        <div className="space-y-2">
          {/* Credit Card Option */}
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="credit-card"
                checked={selectedPayment === "credit-card"}
                onChange={() => setSelectedPayment("credit-card")}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Credit Card</span>
            </label>
            {selectedPayment === "credit-card" && (
              <div className="mt-2 space-y-3">
                <input
                  type="text"
                  placeholder="Card number"
                  className="block w-full border border-gray-300 rounded-md p-3"
                />
                <input
                  type="text"
                  placeholder="Name on card"
                  className="block w-full border border-gray-300 rounded-md p-3"
                />
                <input
                  type="text"
                  placeholder="Expiration date (MM/YY)"
                  className="block w-full border border-gray-300 rounded-md p-3"
                />
                <input
                  type="text"
                  placeholder="Security code"
                  className="block w-full border border-gray-300 rounded-md p-3"
                />
              </div>
            )}
          </div>

          {/* PayPal Option */}
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="paypal"
                checked={selectedPayment === "paypal"}
                onChange={() => setSelectedPayment("paypal")}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">PayPal</span>
            </label>
          </div>

          {/* Apple Pay Option */}
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="apple-pay"
                checked={selectedPayment === "apple-pay"}
                onChange={() => setSelectedPayment("apple-pay")}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Apple Pay</span>
            </label>
          </div>

          {/* Google Pay Option */}
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="google-pay"
                checked={selectedPayment === "google-pay"}
                onChange={() => setSelectedPayment("google-pay")}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Google Pay</span>
            </label>
          </div>

          {/* Swish Option */}
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment-method"
                value="swish"
                checked={selectedPayment === "swish"}
                onChange={() => setSelectedPayment("swish")}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Swish</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full bg-orange-500 text-white text-lg font-semibold py-3 rounded-md mb-20"
        >
          Submit Order
        </button>
      </form>

      <NavigationBottom />
    </div>
  );
};

export default PaymentPage;
