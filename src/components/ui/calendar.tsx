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
      className={cn("p-3 sm:p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-6 sm:space-y-0", // הגדלת הרוחב בין החודשים במסכים גדולים
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm sm:text-base font-medium", // שמירה על גודל פונט מותאם
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 sm:h-8 sm:w-8 bg-transparent p-0 opacity-50 hover:opacity-100" // הקטנת גודל הכפתורים במסכים קטנים והגדלתם מעט במסכים גדולים
        ),
        nav_button_previous: "absolute left-1 sm:left-2",
        nav_button_next: "absolute right-1 sm:right-2",
        table: "w-full border-collapse space-y-1 sm:space-y-2", // שמירה על מרווחים מתאימים
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 sm:w-12 font-normal text-[0.8rem] sm:text-sm", // הקטנת רוחב התא וגודל הפונט
        row: "flex w-full mt-2 sm:mt-3", // הקטנת המרווח בין השורות
        cell: "h-10 w-12 sm:h-12 sm:w-14 text-center text-sm sm:text-base p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // הקטנת גובה התאים והגדלת הרוחב
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-12 sm:h-12 sm:w-14 p-0 font-normal aria-selected:opacity-100 text-sm sm:text-base" // התאמת גודל הכפתור וגודל הפונט
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
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />, // שמירה על גודל אייקונים מותאם
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
