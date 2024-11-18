import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import { BookingProvider } from "../context/BookingContext"; // Import the BookingProvider

import "./globals.css";
import { Toaster } from "./components/ui/toaster";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Nordic Experiences",
  description:
    "Book curated adventures in Scandinavia's capitals - Oslo, Stockholm, Helsinki, and Copenhagen.",
  keywords: [
    "Scandinavian travel",
    "Oslo experiences",
    "Stockholm tours",
    "Helsinki food packages",
    "Copenhagen apartments",
  ],
  authors: [
    { name: "Nordic Experiences Team", url: "https://ne-vnb.vercel.app/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
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
