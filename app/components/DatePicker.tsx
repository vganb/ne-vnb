"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useBookingContext } from "@/context/BookingContext";

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
  const { setBookingStartDate, setBookingEndDate } = useBookingContext();

  // Memoize the default start and end dates
  const defaultStartDate = React.useMemo(() => new Date(), []);
  const defaultEndDate = React.useMemo(() => addDays(new Date(), 3), []);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: defaultStartDate,
    to: defaultEndDate,
  });

  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  React.useEffect(() => {
    // Set default dates in context on mount if no dates are selected
    setBookingStartDate(defaultStartDate);
    setBookingEndDate(defaultEndDate);
  }, [
    setBookingStartDate,
    setBookingEndDate,
    defaultStartDate,
    defaultEndDate,
  ]);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    setBookingStartDate(range?.from || defaultStartDate);
    setBookingEndDate(range?.to || defaultEndDate);
  };

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
            onSelect={handleDateSelect}
            numberOfMonths={isSmallScreen ? 1 : 2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePickerWithRange;
