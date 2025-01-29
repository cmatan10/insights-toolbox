import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: number; // Changed to number type
  message: string;
  contactDate: string; // Added contactDate field
}

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "ישראל ישראלי",
    email: "israel@example.com",
    phone: 501234567, // Changed to number type
    message: "מעוניין בשירותים שלכם",
    contactDate: "2023-10-01", // Example contact date
  },
  {
    id: "2",
    name: "שרה כהן",
    email: "sarah@example.com",
    phone: 527654321, // Changed to number type
    message: "שאלה לגבי המוצר",
    contactDate: "2023-10-02", // Example contact date
  },
  {
    id: "3",
    name: "יוסף לוי",
    email: "yosef@example.com",
    phone: 549876543, // Changed to number type
    message: "מעוניין בהצעת מחיר",
    contactDate: "2023-10-03", // Example contact date
  },
  {
    id: "4",
    name: "שרון בלום",
    email: "sharon@example.com",
    phone: 521231234, // Changed to number type
    message: "בקשה לפגישה",
    contactDate: "2023-10-04", // Example contact date
  },
];

const Lids = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setLeads(leads.filter((lead) => lead.id !== deleteId));
      toast.success("הליד נמחק בהצלחה");
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="glass-card rounded-lg p-6 animate-fadeIn" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">לידים</h2>
      </div>
      
      <ScrollArea className="h-[265px] rounded-md border">
        <div className="relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="text-right">אימייל</TableHead>
                <TableHead className="text-right">טלפון</TableHead>
                <TableHead className="text-right">שם</TableHead>
                <TableHead className="text-right">הודעה</TableHead> {/* Added message column */}
                <TableHead className="text-right">תאריך יצירת קשר</TableHead> {/* Added contact date column */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
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
                  <TableCell className="text-right">{lead.email}</TableCell>
                  <TableCell className="text-right">{lead.phone}</TableCell>
                  <TableCell className="text-right">{lead.name}</TableCell>
                  <TableCell className="text-right">{lead.message}</TableCell> {/* Added message cell */}
                  <TableCell className="text-right">{lead.contactDate}</TableCell> {/* Added contact date cell */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="text-right" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>האם אתה בטוח שברצונך למחוק את הליד?</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו היא בלתי הפיכה. הליד יימחק לצמיתות מהמערכת.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>מחק</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Lids;