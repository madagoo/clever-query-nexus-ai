
import { Link } from "react-router-dom";
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Brain, 
  Clock, 
  Database, 
  FileText,
  BarChart4,
  Settings,
  LogIn,
  UserPlus,
  Server,
  Search
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    title: "Agents IA",
    icon: Brain,
    path: "/agents"
  },
  {
    title: "Workflows",
    icon: Clock,
    path: "/workflows"
  },
  {
    title: "Stockage de données",
    icon: Database,
    path: "/storage"
  },
  {
    title: "Sources connectées",
    icon: FileText,
    path: "/sources"
  },
  {
    title: "Connecteurs de données",
    icon: Server,
    path: "/connectors"
  },
  {
    title: "Analytique",
    icon: BarChart4,
    path: "/analytics"
  },
  {
    title: "Analyseur de Prompts",
    icon: Search,
    path: "/prompt-analyzer"
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/settings"
  }
];

const authItems = [
  {
    title: "Se connecter",
    icon: LogIn,
    path: "/login"
  },
  {
    title: "S'inscrire",
    icon: UserPlus,
    path: "/register"
  }
];

export function AppSidebar() {
  return (
    <ShadcnSidebar className="border-r-0">
      <div className="p-4 flex items-center justify-center">
        <Link to="/" className="text-xl font-bold text-white">AI DataFlow</Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Authentification</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
      </div>
    </ShadcnSidebar>
  );
}

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userRole } = useAuth();
  
  // Si l'utilisateur est admin, afficher avec la sidebar sans espace
  if (isAuthenticated && userRole === 'admin') {
    return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 bg-white">{children}</main>
      </div>
    );
  }
  
  // Sinon, afficher sans sidebar
  return <div className="min-h-screen w-full">{children}</div>;
}
