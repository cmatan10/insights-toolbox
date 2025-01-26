import Navigation from "@/components/Navigation";
import PdfUpload from "@/components/PdfUpload";
import Calendar from "@/components/Calendar";
import Analytics from "@/components/Analytics";
import SupportWidget from "@/components/SupportWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Analytics />
          </div>
          <div>
            <PdfUpload />
          </div>
          <div>
            <Calendar />
          </div>
        </div>
      </main>
      <SupportWidget />
    </div>
  );
};

export default Index;