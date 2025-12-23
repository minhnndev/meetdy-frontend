import { NavMain } from "@/components/common/Sidebar/NavMain";
import { NavUser } from "@/components/common/Sidebar/NavUser";
import { cn } from "@/lib/utils";
import { memo } from "react";

const AppSidebar = () => {
    return (
        <aside className={cn(
            "flex flex-col h-screen w-16 bg-slate-50 border-r border-slate-200",
            "dark:bg-slate-900 dark:border-slate-800"
        )}>
            <div className="flex items-center justify-center h-14 border-b border-slate-200 dark:border-slate-800">
                <img 
                    src="/images/auth/meetdy_logo.png" 
                    alt="Meetdy" 
                    className="w-8 h-8"
                />
            </div>
            <nav className="flex-1 py-4">
                <NavMain />
            </nav>
            <div className="border-t border-slate-200 dark:border-slate-800 py-3">
                <NavUser />
            </div>
        </aside>
    );
};

export default memo(AppSidebar);
