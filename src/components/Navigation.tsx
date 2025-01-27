import { useState } from "react";
import { Link } from "react-router-dom";
import { User, CreditCard, BarChart2, HelpCircle, Menu, X, Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: User, label: "משתמש", path: "/user" },
    { icon: CreditCard, label: "תשלומים", path: "/payments" },
    { icon: BarChart2, label: "דוחות", path: "/reports" },
    { icon: HelpCircle, label: "אודות", path: "/about" },
  ];

  const aiTools = [
    { id: "chatbot", name: "צ'אטבוט AI", description: "עוזר צ'אט חכם" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold bg-gradient-to-r from-[#05baff] to-[#05baff]/80 bg-clip-text text-transparent">
              לוח בקרה AI
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-[#05baff] transition-colors duration-200">
                <Bot className="w-5 h-5 ml-2" />
                <span>כלי AI</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" dir="rtl">
                {aiTools.map((tool) => (
                  <DropdownMenuItem
                    key={tool.id}
                    className="flex flex-col items-start p-2 hover:bg-gray-50"
                  >
                    <span className="font-medium">{tool.name}</span>
                    <span className="text-sm text-gray-500">{tool.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center space-x-2 space-x-reverse text-gray-600 hover:text-[#05baff] transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 ml-2" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#05baff] transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden animate-fadeIn" dir="rtl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-gray-600 hover:text-[#05baff] hover:bg-gray-50">
              <Bot className="w-5 h-5 ml-2" />
              <span>כלי AI</span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-gray-600 hover:text-[#05baff] hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 ml-2" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;