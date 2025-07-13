
import { useState } from 'react';
import { Menu, X, Package, FileText, Settings, Filter, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function Sidebar({ activeFilter, onFilterChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'پیگیری سفارشات', icon: Package },
  ];

  return (
    <div>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden fixed top-4 right-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 right-0 z-40 w-64 bg-sidebar-background border-l border-sidebar-border transform transition-transform duration-200 ease-in-out lg:transform-none h-screen dark:bg-[#2b2f3b] dark:border-[#4a4d57] ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border dark:border-[#4a4d57]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-sidebar-foreground dark:text-white">نام شرکت یا مجموعه</h2>
              <div className="w-8 h-8  flex items-center justify-center">
                <XCircle className="h-6 w-6 text-sidebar-foreground dark:text-white" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              {filters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      onFilterChange(filter.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground dark:bg-[#3b3d49] dark:text-white '
                        : 'hover:bg-sidebar-accent text-sidebar-foreground dark:hover:bg-[#4a4d57] dark:text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
