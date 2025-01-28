import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 sm:p-6", className)} // הגדלת הפדינג הכללי
      classNames={{
        months: "flex flex-col sm:flex-row space-y-6 sm:space-x-6 sm:space-y-0", // הגדלת המרווח בין החודשים
        month: "space-y-6", // הגדלת המרווח בתוך חודש
        caption: "flex justify-center pt-2 relative items-center",
        caption_label: "text-base sm:text-lg font-medium", // הגדלת גודל הפונט בכותרת
        nav: "space-x-2 flex items-center", // הגדלת המרווח בין הכפתורים
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 sm:h-10 sm:w-10 bg-transparent p-0 opacity-50 hover:opacity-100" // הגדלת גודל הכפתורים
        ),
        nav_button_previous: "absolute left-2 sm:left-4", // התאמת מיקום הכפתורים
        nav_button_next: "absolute right-2 sm:right-4",
        table: "w-full border-collapse space-y-2", // הגדלת המרווח בין השורות
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-12 sm:w-14 font-normal text-[0.9rem] sm:text-base", // הגדלת רוחב התא וגודל הפונט
        row: "flex w-full mt-3", // הגדלת המרווח בין השורות
        cell: "h-12 w-12 sm:h-14 sm:w-14 text-center text-sm sm:text-base p-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // הגדלת גודל התאים וגודל הפונט
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-12 w-12 sm:h-14 sm:w-14 p-0 font-normal aria-selected:opacity-100 text-base sm:text-lg" // הגדלת גודל הכפתור וגודל הפונט
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />, // הגדלת גודל האייקונים
        IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
