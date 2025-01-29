import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  role: string;
  content: string;
}

interface CallHistory {
  id: number;
  user: string;
  message: string;
  date: string;
  status: boolean;
  conversation: Conversation[];
}

const ConversationHistory: React.FC = () => {
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);
  const [openConversationId, setOpenConversationId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/call-history')
      .then(response => response.json())
      .then(data => {
        setCallHistory(data);
      })
      .catch(error => {
        console.error('There was an error fetching the call history!', error);
      });
  }, []);

  const selectedConversation = callHistory.find(
    (conv) => conv.id === openConversationId
  );

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn w-full" dir="rtl">
      <h2 className="text-xl font-semibold mb-4 text-right">היסטוריית שיחות</h2>
      <ScrollArea className="h-[396px]">
        <div className="space-y-7">
          {callHistory.map((conv) => (
            <div
              key={conv.id}
              className="p-2 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setOpenConversationId(conv.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{conv.user}</span>
                <span className="text-sm text-gray-500">
                  {new Date(conv.date).toLocaleString("he-IL")}
                </span>
              </div>
              <p className="text-gray-700 text-right">{conv.message}</p>
              <div className="mt-2 text-right">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    conv.status
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {conv.status ? "טופל" : "בטיפול"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {openConversationId && selectedConversation && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          onClick={() => setOpenConversationId(null)}
        >
          <div
            className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute mb-7 left-2 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenConversationId(null)}
            >
               ✕
            </button>
            <ScrollArea className="h-[250px]">
            <h3 className="text-lg font-semibold mb-4 mr-6 text-right">
              שיחה עם {selectedConversation.user}
            </h3>

            <div className="max-h-96 overflow-y-auto space-y-3 mr-6">
              {selectedConversation.conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            </ScrollArea>

          </div>
          
        </div>
      )}
    </div>
  );
};

export default ConversationHistory;
