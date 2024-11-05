import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { PackageCardProps } from "../../lib/types";
import Image from "next/image";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {/* Image of the experience */}
        <Image
          src={image}
          alt={title}
          height={1920}
          width={1080}
          priority
          className="rounded-md object-cover h-48 w-full"
        />

        {/* City and Price aligned on the same line */}
        <div className="flex justify-between mt-4">
          <CardDescription className="text-gray-500">{city}</CardDescription>
          <span className="text-lg font-bold">${price}</span>
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
