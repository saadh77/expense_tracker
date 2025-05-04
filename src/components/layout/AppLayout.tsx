
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';

interface AppLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const AppLayout = ({ children, onLogout }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar onLogout={onLogout} />
        <div className="flex-1">
          <div className="p-4 sm:p-6 md:p-8">
            <SidebarTrigger />
            <main className="mt-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
