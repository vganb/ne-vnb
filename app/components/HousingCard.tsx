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
import { useRouter } from "next/navigation";
import Image from "next/image";

interface HousingCardProps {
  id: string;
  title: string;
  city: string;
  price: number;
  rating: number;
  description: string;
  tag: string;
  host: string;
  images: string[];
  tagBgColor?: string; // Optional background color for the tag
}

export function HousingCard({
  id,
  title,
  city,
  price,
  description,
  tag,
  images = [],
  tagBgColor = "bg-orange-500", // Default background color for housing tag
}: HousingCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to the housing detail page using the housing id
    router.push(`/housing/${id}`);
  };

  return (
    <div className="flex flex-col">
      {/* Back Button */}

      {/* Housing Card */}
      <Card className="w-5/6 mt-2 max-w-2xl mx-auto" onClick={handleCardClick}>
        <CardHeader></CardHeader>
        <CardContent className="relative">
          {/* Image of the house */}
          <Image
            src={images[0]} // Use dynamic image from props
            alt={title}
            height={1920}
            width={1080}
            className="rounded-md object-cover h-48 w-full"
          />
          <CardTitle>{title}</CardTitle>

          {/* City and Price aligned on the same line */}
          <div className="flex justify-between mt-2">
            <CardDescription className="text-lg text-gray-500">
              {city}
            </CardDescription>
            <span className="text-lg font-bold">${price}/night</span>
          </div>

          {/* Tag Badge on the Image */}
          <div
            className={`absolute top-2 right-8 px-2 py-1 text-xs font-semibold text-white rounded ${tagBgColor}`}
          >
            <p>{tag}</p>
          </div>

          {/* Property description */}
          <p className="mt-2">{description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center"></CardFooter>
      </Card>
    </div>
  );
}

export default HousingCard;
