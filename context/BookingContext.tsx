"use client";
import { createContext, useContext, useState } from "react";

interface BookingContextType {
  bookingId: string | null;
  setBookingId: (id: string | null) => void;
  bookingStartDate: Date | null;
  setBookingStartDate: (date: Date | null) => void;
  bookingEndDate: Date | null;
  setBookingEndDate: (date: Date | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingStartDate, setBookingStartDate] = useState<Date | null>(null);
  const [bookingEndDate, setBookingEndDate] = useState<Date | null>(null);

  return (
    <BookingContext.Provider
      value={{
        bookingId,
        setBookingId,
        bookingStartDate,
        setBookingStartDate,
        bookingEndDate,
        setBookingEndDate,
      }}
    >
      {" "}
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
