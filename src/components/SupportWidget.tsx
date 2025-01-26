import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass-card rounded-lg w-80 animate-fadeIn">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold">Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              How can we help you today?
            </p>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
              rows={4}
              placeholder="Type your message..."
            />
            <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
              Send Message
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SupportWidget;