import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { he } from 'date-fns/locale';
import { ScrollArea } from "@/components/ui/scroll-area";

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
  {
    id: 4,
    title: "פגישת לקוח",
    time: "15:00",
    duration: "שעה",
    date: addDays(new Date(), 2),
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayMeetings, setSelectedDayMeetings] = useState(meetings);
  const [showAllMeetings, setShowAllMeetings] = useState(true);

  // לקבל את שם החודש הנוכחי בעברית
  const currentMonth = format(new Date(), "LLLL", { locale: he });

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setShowAllMeetings(false);
    if (selectedDate) {
      const filteredMeetings = meetings.filter(
        (meeting) =>
          format(meeting.date, "yyyy-MM-dd", { locale: he }) ===
          format(selectedDate, "yyyy-MM-dd", { locale: he })
      );
      setSelectedDayMeetings(filteredMeetings);
    }
  };

  const handleCalendarClick = () => {
    setShowAllMeetings(true);
    setSelectedDayMeetings(meetings);
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn max-w mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">לוח שנה חודשי</h2>
        <div className="relative group">
          <button 
            onClick={handleCalendarClick}
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <CalendarIcon className="w-5 h-5" />
          </button>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-200 bg-white text-[#05baff] text-sm py-1 px-3 rounded-lg shadow-lg">
            {`כל הפגישות בחודש ${currentMonth}`}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={handleSelect}
            className="rounded-md border mx-auto"
            locale={he}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            {showAllMeetings 
              ? `כל הפגישות בחודש ${currentMonth}`
              : `פגישות ל-${date ? format(date, "dd/MM/yyyy", { locale: he }) : "היום"}`
            }
          </h3>

          <ScrollArea className="h-[168px]">
            {selectedDayMeetings.length > 0 ? (
              selectedDayMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="hover-card flex items-center p-3 rounded-lg bg-white border border-gray-200 mb-4"
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
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                אין פגישות מתוכננות ליום זה
              </p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
