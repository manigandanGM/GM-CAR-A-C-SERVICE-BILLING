
import { SidebarProvider } from "@/components/ui/sidebar";
import InvoiceForm from "@/components/InvoiceForm";
import InvoiceList from "@/components/InvoiceList";
import CompanySettings from "@/components/CompanySettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50">
        <AppSidebar />
        <div className="flex-1 px-4 sm:px-8 py-8 relative">
          {/* Sticky gradient header */}
          <header className="w-full top-0 left-0 flex flex-col items-center justify-center z-40 mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold header-gradient-text tracking-tight animate-fade-in text-center drop-shadow-lg">
              GM CAR A/C SERVICE &amp; MULTIBRAND
            </h1>
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 w-48 mx-auto mt-2 rounded-full"></div>
          </header>
          
          <Tabs defaultValue="invoice" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-50">
              <TabsTrigger value="invoice">New Invoice</TabsTrigger>
              <TabsTrigger value="list">Invoice List</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="invoice" className="rounded-md bg-white/70 backdrop-blur-sm shadow card-gradient">
              <InvoiceForm />
            </TabsContent>
            <TabsContent value="list">
              <InvoiceList />
            </TabsContent>
            <TabsContent value="settings">
              <CompanySettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
