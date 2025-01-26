import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

// Mock data - replace with actual Google Calendar data when API is integrated
const meetings = [
  {
    id: 1,
    title: "Team Sync",
    time: "10:00 AM",
    duration: "30min",
    date: new Date(),
  },
  {
    id: 2,
    title: "Client Meeting",
    time: "2:00 PM",
    duration: "1h",
    date: addDays(new Date(), 1),
  },
  {
    id: 3,
    title: "Project Review",
    time: "4:30 PM",
    duration: "45min",
    date: addDays(new Date(), 2),
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDayMeetings, setSelectedDayMeetings] = useState(meetings);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      // Filter meetings for the selected date
      const filteredMeetings = meetings.filter(
        (meeting) =>
          format(meeting.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      );
      setSelectedDayMeetings(filteredMeetings);
    }
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Monthly Calendar</h2>
        <button className="text-primary hover:text-primary/80 transition-colors duration-200">
          <CalendarIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <CalendarUI
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border"
        />

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            Events for {date ? format(date, "MMMM d, yyyy") : "Today"}
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
                    <Clock className="w-4 h-4 mr-1" />
                    <span>
                      {meeting.time} · {meeting.duration}
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors duration-200">
                  Join
                </button>
              </div>
            ))}
            {selectedDayMeetings.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No events scheduled for this day
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;