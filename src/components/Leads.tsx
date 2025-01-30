import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Mail, Phone, Calendar, MessageSquare, User2 } from "lucide-react";
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

  const formatPhoneNumber = (phone: number) => {
    const phoneStr = phone.toString();
    return `${phoneStr.slice(0, 3)}-${phoneStr.slice(3)}`;
  };

  return (
    <div className="glass-card rounded-lg p-4 md:p-6 animate-fadeIn" dir="rtl">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-primary">לידים</h2>
      </div>
      
      <ScrollArea className="h-[600px] w-full rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
          {leads.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              אין לידים להצגה
            </div>
          ) : (
            leads.map((lead) => (
              <div 
                key={lead.id} 
                className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <User2 className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{lead.name}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(lead.id)}
                    className="hover:text-red-500 h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                      {lead.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <a href={`tel:${lead.phone}`} className="hover:text-primary">
                      {formatPhoneNumber(lead.phone)}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{lead.contactDate}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <MessageSquare className="h-4 w-4 text-gray-500 shrink-0 mt-1" />
                    <p className="text-gray-600 break-words">{lead.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
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

export default Leads;