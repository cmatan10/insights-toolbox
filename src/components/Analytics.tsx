import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type TimeRange = "daily" | "weekly" | "monthly";

// Mock data for chat interactions
const generateMockData = (range: TimeRange) => {
  switch (range) {
    case "daily":
      return [
        { name: "00:00", interactions: 14 },
        { name: "04:00", interactions: 23 },
        { name: "08:00", interactions: 47 },
        { name: "12:00", interactions: 52 },
        { name: "16:00", interactions: 39 },
        { name: "20:00", interactions: 26 },
      ];
    case "weekly":
      return [
        { name: "Mon", interactions: 82 },
        { name: "Tue", interactions: 99 },
        { name: "Wed", interactions: 73 },
        { name: "Thu", interactions: 85 },
        { name: "Fri", interactions: 92 },
        { name: "Sat", interactions: 43 },
        { name: "Sun", interactions: 49 },
      ];
    case "monthly":
      return [
        { name: "Week 1", interactions: 345 },
        { name: "Week 2", interactions: 452 },
        { name: "Week 3", interactions: 449 },
        { name: "Week 4", interactions: 563 },
      ];
  }
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const data = generateMockData(timeRange);

  // Mock data for counters
  const resolvedWithoutHuman = 1234;
  const scheduledMeetings = 567;

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="flex space-x-2">
          {["daily", "weekly", "monthly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as TimeRange)}
              className={`px-3 py-1 rounded-md text-sm transition-colors duration-200 ${
                timeRange === range
                  ? "bg-[#05baff] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Counters Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Resolved Without Human</div>
          <div className="text-2xl font-semibold text-[#05baff]">{resolvedWithoutHuman}</div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Scheduled Meetings</div>
          <div className="text-2xl font-semibold text-[#05baff]">{scheduledMeetings}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="interactions"
              fill="#05baff"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;