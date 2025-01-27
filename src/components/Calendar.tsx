import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

const meetings = [
  {
    id: 1,
    title: "פגישת צוות",
    time: "10:00",
    duration: "30 דקות",
    date: new Date(),
  },
  {
    id: 2,
    title: "פגישת לקוח",
    time: "14:00",
    duration: "שעה",
    date: addDays(new Date(), 1),
  },
  {
    id: 3,
    title: "סקירת פרויקט",
    time: "16:30",
    duration: "45 דקות",
    date: addDays(new Date(), 2),
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayMeetings, setSelectedDayMeetings] = useState(meetings);
  const [showAllMeetings, setShowAllMeetings] = useState(true);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setShowAllMeetings(false);
    if (selectedDate) {
      const filteredMeetings = meetings.filter(
        (meeting) =>
          format(meeting.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      );
      setSelectedDayMeetings(filteredMeetings);
    }
  };

  const handleCalendarClick = () => {
    setShowAllMeetings(true);
    setSelectedDayMeetings(meetings);
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn h-full" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">לוח שנה חודשי</h2>
        <button 
          onClick={handleCalendarClick}
          className="text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <CalendarUI
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border w-full"
          locale="he"
          classNames={{
            head_cell: "text-right font-medium",
            cell: "text-right h-9 w-9 text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            table: "w-full border-collapse space-y-1",
          }}
        />

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            {showAllMeetings 
              ? "כל הפגישות החודשיות" 
              : `פגישות ל-${date ? format(date, "dd/MM/yyyy") : "היום"}`
            }
          </h3>
          <div className="space-y-4">
            {selectedDayMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="hover-card flex items-center p-4 rounded-lg bg-white border border-gray-200"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{meeting.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 ml-1" />
                    <span>
                      {meeting.time} · {meeting.duration}
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                  הצטרף
                </button>
              </div>
            ))}
            {selectedDayMeetings.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                אין פגישות מתוכננות ליום זה
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
