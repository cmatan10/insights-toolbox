import Navigation from "@/components/Navigation";
import PdfUpload from "@/components/PdfUpload";
import Calendar from "@/components/Calendar";
import Analytics from "@/components/Analytics";
import SupportWidget from "@/components/SupportWidget";
import ConversationHistory from "@/components/ConversationHistory";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50" dir="rtl">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Analytics />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <div className="mb-6">
              <PdfUpload />
            </div>
            <div>
              <ConversationHistory />
            </div>
          </div>
          <div className="md:col-span-6">
            <Calendar />
          </div>
        </div>
      </main>
      <SupportWidget />
    </div>
  );
};

export default Index;