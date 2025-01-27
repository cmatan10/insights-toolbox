import { ScrollArea } from "@/components/ui/scroll-area";

// Mock conversation data - replace with actual data when available
const conversations = [
  {
    id: 1,
    user: "User123",
    message: "How do I reset my password?",
    date: "2024-01-27T10:30:00",
    resolved: true,
  },
  {
    id: 2,
    user: "User456",
    message: "When is the next maintenance window?",
    date: "2024-01-27T11:15:00",
    resolved: true,
  },
  {
    id: 3,
    user: "User789",
    message: "Can you help with API integration?",
    date: "2024-01-27T14:20:00",
    resolved: false,
  },
];

const ConversationHistory = () => {
  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Conversation History</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{conv.user}</span>
                <span className="text-sm text-gray-500">
                  {new Date(conv.date).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700">{conv.message}</p>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    conv.resolved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {conv.resolved ? "Resolved" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationHistory;