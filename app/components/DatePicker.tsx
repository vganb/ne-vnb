"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", listener);
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });

  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <div
      className={cn(
        "w-full sm:w-[400px] grid gap-2 place-items-center",
        className
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full sm:w-[400px] justify-start font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "w-full sm:w-auto sm:min-w-[600px] p-0",
            "overflow-hidden"
          )}
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={isSmallScreen ? 1 : 2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerWithRange;
