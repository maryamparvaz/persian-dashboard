import { Bell, User, Clock, MessageCircle  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function UserProfile() {
  return (
    <div className="bg-background border-b border-border px-4 py-3 dark:bg-[#3b3d49] dark:border-[#4a4d57]">
      <div className="flex items-center justify-between">
        {/* Left side - Time info */}
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                alt="احمد محمدی" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-right">
              <div className="text-[18px] font-medium text-foreground dark:text-white">مهدی دارابی</div>
              <div className="text-xs text-muted-foreground mt-2 bg-muted p-2 rounded-full border border-border dark:text-gray-400 dark:bg-[#2b2f3b] dark:border-[#4a4d57]">09123445678</div>
            </div>
          </div>
        </div>

        {/* Right side - User info and theme toggle */}
        <div className="flex items-center gap-3">
          <div className="persian-numbers text-xs rounded-full bg-primary p-3 flex items-center gap-2 text-primary-foreground dark:bg-[#4a4d57] dark:text-white">
            <Clock className="h-4 w-4 dark:text-blue-300" />
            ۱۴:۳۰ , شنبه 25 اسفند
          </div>
          <div className="text-xs text-muted-foreground rounded-full border border-border p-3 flex bg-muted dark:text-gray-400 dark:border-[#4a4d57] dark:bg-[#2b2f3b]">
            <User className="h-4 w-4 ml-1 dark:text-gray-300" />
            اخرین لاگین : 4ساعت پیش
          </div>

          <ThemeToggle />

          <Button variant="ghost" size="sm" className="relative bg-muted hover:bg-accent dark:bg-[#2b2f3b] dark:hover:bg-[#4a4d57] dark:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              ۲
            </span>
          </Button>
          <Button variant="ghost" size="sm" className="relative bg-muted hover:bg-accent dark:bg-[#2b2f3b] dark:hover:bg-[#4a4d57] dark:text-white">
            <MessageCircle className="h-4 w-4" />
          </Button>


        </div>
      </div>
    </div>
  );
}
