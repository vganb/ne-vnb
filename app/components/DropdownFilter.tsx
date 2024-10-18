"use client";

import * as React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownFilterProps {
  selectedCities: string[];
  setSelectedCities: React.Dispatch<React.SetStateAction<string[]>>;
}

export function DropdownFilter({
  selectedCities,
  setSelectedCities,
}: DropdownFilterProps) {
  const toggleCity = (value: string) => {
    setSelectedCities((prevCities) =>
      prevCities.includes(value)
        ? prevCities.filter((city) => city !== value)
        : [...prevCities, value]
    );
  };

  const cityLabels: { [key: string]: string } = {
    Copenhagen: "Copenhagen",
    Stockholm: "Stockholm",
    Helsinki: "Helsinki",
    Oslo: "Oslo",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-[400px] justify-between font-normal"
        >
          <div className="flex items-center">
            <div className="font-semibold">Destination</div>
            <div className="font-thin pl-2">
              {selectedCities.length > 0
                ? selectedCities.map((city) => cityLabels[city]).join(", ")
                : "All"}
            </div>
            <div className="pl-2">
              <IoIosArrowDown size={25} />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {Object.entries(cityLabels).map(([value, label]) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={selectedCities.includes(value)}
            onCheckedChange={() => toggleCity(value)}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownFilter;
