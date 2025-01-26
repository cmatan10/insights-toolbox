import { useState } from "react";
import { Bot, MessageSquare, Calendar } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  icon: typeof Bot;
  description: string;
}

const tools: Tool[] = [
  {
    id: "sales",
    name: "Sales AI",
    icon: MessageSquare,
    description: "AI-powered sales automation and insights",
  },
  {
    id: "content",
    name: "Content AI",
    icon: Bot,
    description: "Content generation and management",
  },
  {
    id: "scheduling",
    name: "Scheduling AI",
    icon: Calendar,
    description: "Smart meeting scheduling assistant",
  },
];

const ToolPanel = () => {
  const [selectedTool, setSelectedTool] = useState<string>("sales");

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`hover-card p-4 rounded-lg text-left ${
              selectedTool === tool.id
                ? "bg-primary/10 border-primary"
                : "bg-white border-gray-200"
            } border`}
          >
            <div className="flex items-center space-x-3">
              <tool.icon
                className={`w-6 h-6 ${
                  selectedTool === tool.id ? "text-primary" : "text-gray-500"
                }`}
              />
              <div>
                <h3 className="font-medium">{tool.name}</h3>
                <p className="text-sm text-gray-500">{tool.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToolPanel;