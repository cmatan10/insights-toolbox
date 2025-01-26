import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type TimeRange = "daily" | "weekly" | "monthly";

const generateMockData = (range: TimeRange) => {
  switch (range) {
    case "daily":
      return [
        { name: "00:00", value: 4 },
        { name: "04:00", value: 3 },
        { name: "08:00", value: 7 },
        { name: "12:00", value: 12 },
        { name: "16:00", value: 9 },
        { name: "20:00", value: 6 },
      ];
    case "weekly":
      return [
        { name: "Mon", value: 12 },
        { name: "Tue", value: 19 },
        { name: "Wed", value: 3 },
        { name: "Thu", value: 5 },
        { name: "Fri", value: 2 },
        { name: "Sat", value: 3 },
        { name: "Sun", value: 9 },
      ];
    case "monthly":
      return [
        { name: "Week 1", value: 45 },
        { name: "Week 2", value: 52 },
        { name: "Week 3", value: 49 },
        { name: "Week 4", value: 63 },
      ];
  }
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const data = generateMockData(timeRange);

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
              dataKey="value"
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