
import Header from "@/components/layout/Header";
import SidebarWrapper from "@/components/layout/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Index = () => {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-screen">
        <Header title="Dashboard" />
        <DashboardContent />
      </div>
    </SidebarWrapper>
  );
};

export default Index;
