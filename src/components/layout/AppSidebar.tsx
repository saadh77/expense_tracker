
import { Home, BarChart, History, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { useToast } from '@/components/ui/use-toast';

interface AppSidebarProps {
  onLogout: () => void;
}

const AppSidebar = ({ onLogout }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const menuItems = [
    { title: 'Dashboard', path: '/', icon: Home },
    { title: 'Transactions', path: '/transactions', icon: History },
    { title: 'Analytics', path: '/analytics', icon: BarChart },
    { title: 'Settings', path: '/settings', icon: Settings }
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    onLogout();
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex justify-center p-6">
          <h1 className="text-xl font-bold text-primary">ExpenseFlow</h1>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={location.pathname === item.path ? "bg-sidebar-accent" : ""}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="mt-auto p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-start" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
