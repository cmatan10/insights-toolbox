import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "ישראל ישראלי",
    email: "israel@example.com",
    phone: "050-1234567",
  },
  {
    id: "2",
    name: "שרה כהן",
    email: "sarah@example.com",
    phone: "052-7654321",
  },
  {
    id: "3",
    name: "יוסף לוי",
    email: "yosef@example.com",
    phone: "054-9876543",
  },
];

const Lids = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const handleDelete = (id: string) => {
    setLeads(leads.filter((lead) => lead.id !== id));
    toast.success("הליד נמחק בהצלחה");
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">לידים</h2>
      </div>
      
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">שם</TableHead>
              <TableHead className="text-right">אימייל</TableHead>
              <TableHead className="text-right">טלפון</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="text-right">{lead.name}</TableCell>
                <TableCell className="text-right">{lead.email}</TableCell>
                <TableCell className="text-right">{lead.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(lead.id)}
                    className="hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Lids;