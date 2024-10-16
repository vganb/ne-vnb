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

export function DropdownFilter() {
  const [positions, setPositions] = React.useState<string[]>([]);

  const togglePosition = (value: string) => {
    setPositions((prevPositions) =>
      prevPositions.includes(value)
        ? prevPositions.filter((p) => p !== value)
        : [...prevPositions, value]
    );
  };

  const positionLabels: { [key: string]: string } = {
    "1": "Copenhagen",
    "2": "Stockholm",
    "3": "Helsinki",
    "4": "Oslo",
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
              {positions.length > 0
                ? positions.map((value) => positionLabels[value]).join(", ")
                : "All"}
            </div>
            <div className="pl-2">
              <IoIosArrowDown size={25} />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {Object.entries(positionLabels).map(([value, label]) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={positions.includes(value)}
            onCheckedChange={() => togglePosition(value)}
          >
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownFilter;
