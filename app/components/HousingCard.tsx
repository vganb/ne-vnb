"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IoArrowBackCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface HousingCardProps {
  id: string;
  title: string;
  city: string;
  price: number;
  rating: number;
  description: string;
  tag: string;
  host: string;
  image: string;
  tagBgColor?: string; // Optional background color for the tag
}

export function HousingCard({
  id,
  title,
  city,
  price,
  description,
  tag,
  image,
  tagBgColor = "bg-orange-500", // Default color for housing tag
}: HousingCardProps) {
  const router = useRouter();
  const handleCardClick = () => {
    // Navigate to the housing detail page
    router.push(`/housing/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="mt-4 pl-1">
        <IoArrowBackCircle
          onClick={() => router.back()}
          size={40}
          fill="black"
        />
      </div>
      <button className="bg-orange-400 mx-auto py-2 px-8 rounded-md">
        Skip housing
      </button>
      <h1 className="mx-auto mt-4 text-xl font-bold">Available Apartments</h1>
      <Card className="w-5/6 mt-2 max-w-2xl mx-auto" onClick={handleCardClick}>
        <CardHeader></CardHeader>
        <CardContent className="relative">
          {/* Image of the house */}
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-713793474951553871/original/2ac03203-3d06-441c-bc82-77f28ac26c6a.jpeg?im_w=960"
            alt={title}
            className="rounded-md object-cover h-48 w-full"
          />
          <CardTitle>Lorem ipsum dolor sit.</CardTitle>

          {/* City and Price aligned on the same line */}
          <div className="flex justify-between mt-2">
            <CardDescription className=" text-lg text-gray-500">
              Stockholm
            </CardDescription>
            <span className="text-lg font-bold">$300</span>
          </div>

          {/* Tag Badge on the Image */}
          <div
            className={`absolute top-2 right-8 px-2 py-1 text-xs font-semibold text-white rounded ${tagBgColor}`}
          >
            <p>Nature</p>
          </div>

          {/* Property description */}
          <p className="mt-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
            labore dolorum obcaecati soluta in dolore nisi error fugiat placeat
            libero!
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center"></CardFooter>
      </Card>
    </div>
  );
}

export default HousingCard;
