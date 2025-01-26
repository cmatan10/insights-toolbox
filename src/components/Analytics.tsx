import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 19 },
  { name: "Wed", value: 3 },
  { name: "Thu", value: 5 },
  { name: "Fri", value: 2 },
  { name: "Sat", value: 3 },
  { name: "Sun", value: 9 },
];

const Analytics = () => {
  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-6">Weekly Analytics</h2>
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
              fill="currentColor"
              className="text-primary"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;