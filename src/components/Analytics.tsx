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
        { name: "יום ב'", interactions: 82 },
        { name: "יום ג'", interactions: 99 },
        { name: "יום ד'", interactions: 73 },
        { name: "יום ה'", interactions: 85 },
        { name: "יום ו'", interactions: 92 },
        { name: "שבת", interactions: 43 },
        { name: "יום א'", interactions: 49 },
      ];
    case "monthly":
      return [
        { name: "שבוע 1", interactions: 345 },
        { name: "שבוע 2", interactions: 452 },
        { name: "שבוע 3", interactions: 449 },
        { name: "שבוע 4", interactions: 563 },
      ];
  }
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const data = generateMockData(timeRange);

  // Mock data for counters
  const resolvedWithoutHuman = 1234;
  const scheduledMeetings = 567;
  const totalInteractions = 2345;

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">ניתוח נתונים</h2>
        <div className="flex space-x-2 space-x-reverse">
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
              {range === "daily" ? "יומי" : range === "weekly" ? "שבועי" : "חודשי"}
            </button>
          ))}
        </div>
      </div>

      {/* Counters Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">סה״כ אינטראקציות</div>
          <div className="text-2xl font-semibold text-[#05baff]">{totalInteractions}</div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">נפתר ללא מענה אנושי</div>
          <div className="text-2xl font-semibold text-[#05baff]">{resolvedWithoutHuman}</div>
        </div>
        <div className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">פגישות שנקבעו</div>
          <div className="text-2xl font-semibold text-[#05baff]">{scheduledMeetings}</div>
        </div>
      </div>

      {/* Chart */}
      <div>
        <h3 className="text-lg font-medium mb-4">אינטראקציות משתמשים בצ׳אט</h3>
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
                formatter={(value) => [`${value} אינטראקציות`]}
                labelFormatter={(label) => `${label}`}
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
    </div>
  );
};

export default Analytics;