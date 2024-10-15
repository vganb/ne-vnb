"use client";

import * as React from "react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  //   DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

export function DropdownFilter() {
  const [position, setPosition] = React.useState("1");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="flex items-center">
            <div className="font-semibold">Destination</div>
            <div className="font-thin pl-2">
              Stockholm, Helsinki, Copenhagen,Oslo
            </div>
            <div className="pl-2">
              <IoIosArrowDown size={25} />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="1">Copenhagen</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="2">Stockholm</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="3">Helsinki</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="4">Oslo</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownFilter;
