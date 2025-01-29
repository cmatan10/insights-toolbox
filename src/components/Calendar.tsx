import { useState, useEffect } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { he } from 'date-fns/locale';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Meeting {
  id: number;
  title: string;
  time: string;
  duration: string;
  date: Date;
  participants: string[];
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayMeetings, setSelectedDayMeetings] = useState<Meeting[]>([]);
  const [showAllMeetings, setShowAllMeetings] = useState(true);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/meetings')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched meetings:', data);
        const formattedMeetings = data.map((meeting: Meeting) => ({
          ...meeting,
          date: new Date(meeting.date)
        }));
        setMeetings(formattedMeetings);
        setSelectedDayMeetings(formattedMeetings);
      })
      .catch(error => console.error('Error fetching meetings:', error));
  }, []);

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
    console.log('All meetings:', meetings);
  };

  return (
    <div className="glass-card rounded-lg p-4 sm:p-6 animate-fadeIn max-w-full mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">לוח שנה חודשי</h2>
        <div className="relative group">
          <button 
            onClick={handleCalendarClick}
            className="text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] transition-all duration-200 bg-white text-[#05baff] text-sm py-1 px-3 rounded-lg shadow-lg whitespace-nowrap">
            {`כל הפגישות בחודש ${currentMonth}`}
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex justify-center w-full">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={handleSelect}
            className="w-full border rounded-md"
            locale={he}
          />
        </div>

        <div className="mt-4 sm:mt-6">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            {showAllMeetings 
              ? `כל הפגישות בחודש ${currentMonth}`
              : `פגישות ל-${date ? format(date, "dd/MM/yyyy", { locale: he }) : "היום"}`
            }
          </h3>

          <ScrollArea className="h-[200px] sm:h-[255px]">
            {selectedDayMeetings.length > 0 ? (
              selectedDayMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="hover-card flex items-center p-2 sm:p-3 rounded-lg bg-white border border-gray-200 mb-3 sm:mb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-sm sm:text-base">{meeting.title}</h3>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      <span>
                        {meeting.time} · {meeting.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mr-2 sm:mr-3">
                    {meeting.participants.join(', ')}
                    <Users className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <button className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
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