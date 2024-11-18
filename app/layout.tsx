import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import { BookingProvider } from "../context/BookingContext"; // Import the BookingProvider

import "./globals.css";
import { Toaster } from "./components/ui/toaster";

export const metadata: Metadata = {
  title: "Nordic Experiences",
  description: "Nordic Experiences - Book your next adventure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <BookingProvider>
            {children}
            <Toaster />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
