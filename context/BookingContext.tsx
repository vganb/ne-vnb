"use client";
import { createContext, useContext, useState } from "react";

interface BookingContextType {
  bookingId: string | null;
  setBookingId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingId, setBookingId] = useState<string | null>(null);

  return (
    <BookingContext.Provider value={{ bookingId, setBookingId }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
