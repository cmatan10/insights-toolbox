import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
  phone: number;
  message: string;
  contactDate: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5001/api/customer-inquiries')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched leads:', data);
        setLeads(data);
      })
      .catch(error => console.error('Error fetching leads:', error));
  }, []);

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
    <div className="glass-card rounded-lg p-2 sm:p-4 md:p-6 animate-fadeIn" dir="rtl">
      <div className="flex justify-between items-center mb-2 sm:mb-4 md:mb-6">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">לידים</h2>
      </div>
      
      <div className="overflow-hidden">
        <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border">
          <div className="min-w-[640px] sm:min-w-[768px] lg:min-w-[800px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="text-right">אימייל</TableHead>
                  <TableHead className="text-right">טלפון</TableHead>
                  <TableHead className="text-right">שם</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">הודעה</TableHead>
                  <TableHead className="text-right hidden md:table-cell">תאריך יצירת קשר</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">אין לידים להצגה</TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
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
                      <TableCell className="text-right max-w-[150px] truncate">{lead.email}</TableCell>
                      <TableCell className="text-right">{lead.phone}</TableCell>
                      <TableCell className="text-right">{lead.name}</TableCell>
                      <TableCell className="text-right hidden sm:table-cell max-w-[200px] truncate">
                        {lead.message}
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">{lead.contactDate}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>

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

export default Leads;