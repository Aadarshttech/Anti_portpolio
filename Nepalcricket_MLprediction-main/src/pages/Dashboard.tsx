import { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarFooter } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Format } from '@/types/cricket';
import DataOverview from '@/components/DataOverview';
import MLPredictions from '@/components/MLPredictions';
import OppositionAnalysis from '@/components/OppositionAnalysis';
import BestPlayingXI from '@/components/BestPlayingXI';
import PlayerComparison from '@/components/PlayerComparison';
import { LayoutDashboard, Brain, Trophy, Users, BarChart2, ExternalLink, Menu, Search, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard = () => {
  const [selectedFormat, setSelectedFormat] = useState<Format>('Both');
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Data Overview', icon: LayoutDashboard },
    { id: 'predictions', label: 'ML Predictions', icon: Brain },
    { id: 'opposition', label: 'Opposition Analysis', icon: Users },
    { id: 'playingxi', label: 'Best Playing XI', icon: Trophy },
    { id: 'comparison', label: 'Player Comparison', icon: BarChart2 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DataOverview format={selectedFormat} />;
      case 'predictions': return <MLPredictions format={selectedFormat} />;
      case 'opposition': return <OppositionAnalysis format={selectedFormat} />;
      case 'playingxi': return <BestPlayingXI format={selectedFormat} />;
      case 'comparison': return <PlayerComparison format={selectedFormat} />;
      default: return <DataOverview format={selectedFormat} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground font-sans">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}can-logo.png`} alt="CAN Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-lg text-primary">Nepal Cricket</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent data-[active=true]:bg-primary data-[active=true]:text-white rounded-lg"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t flex flex-col gap-4">
            <div className="text-xs text-center text-gray-500 font-medium">
              Designed and created by <span className="text-primary">Aadarsh Pandit</span>
            </div>
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors w-full px-2 py-1.5 rounded-md hover:bg-gray-100"
            >
              <ExternalLink size={16} />
              <span>Back to Portfolio</span>
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Header */}
          <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-2 md:hidden" />
              <h1 className="text-xl font-bold text-gray-800">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border">
                <span className="text-sm font-medium text-gray-600">Format:</span>
                <Select value={selectedFormat} onValueChange={(value) => setSelectedFormat(value as Format)}>
                  <SelectTrigger className="h-8 w-[120px] border-none bg-transparent shadow-none focus:ring-0 p-0 text-sm font-bold text-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="T20I">T20I</SelectItem>
                    <SelectItem value="ODI">ODI</SelectItem>
                    <SelectItem value="Both">All Formats</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Main Content Area */}
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
