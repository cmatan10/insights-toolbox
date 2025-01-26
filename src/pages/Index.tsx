import Navigation from "@/components/Navigation";
import ToolPanel from "@/components/ToolPanel";
import PdfUpload from "@/components/PdfUpload";
import Calendar from "@/components/Calendar";
import Analytics from "@/components/Analytics";
import SupportWidget from "@/components/SupportWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <ToolPanel />
          </div>
          <div className="lg:col-span-2">
            <PdfUpload />
          </div>
          <div>
            <Calendar />
          </div>
          <div className="lg:col-span-3">
            <Analytics />
          </div>
        </div>
      </main>
      <SupportWidget />
    </div>
  );
};

export default Index;