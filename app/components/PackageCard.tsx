import * as React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PackageCardProps {
  title: string;
  city: string;
  description: string;
  price: number;
  tag: string;
  image: string;
  tagBgColor?: string; // Optional background color for the tag
}

export function PackageCard({
  title,
  city,
  description,
  price,
  tag,
  image,
  tagBgColor = "bg-orange-500", // Default color if none is provided
}: PackageCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {/* Image of the experience */}
        <img
          src={image}
          alt={title}
          className="rounded-md object-cover h-48 w-full"
        />

        {/* City of the experience */}
        <div className="flex justify-between">
          <CardDescription>
            {city}

            <span className="text-lg font-bold">${price}</span>
          </CardDescription>
        </div>

        {/* Tag Badge on the Image */}
        <div
          className={`absolute top-2 right-8 px-2 py-1 text-xs font-semibold text-white rounded ${tagBgColor}`}
        >
          {tag}
        </div>

        <p className="mt-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center"></CardFooter>
    </Card>
  );
}

export default PackageCard;
