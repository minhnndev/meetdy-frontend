import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { MessageCircle, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}

export function NavMain() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const items: NavItem[] = [
        {
            title: t("app.chat"),
            url: "/chat",
            icon: MessageCircle,
        },
        {
            title: t("app.friend"),
            url: "/friend",
            icon: UsersRound,
        },
    ];

    const NavButton = ({ item }: { item: NavItem }) => {
        const isActive = location.pathname.startsWith(item.url);
        
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => navigate(item.url)}
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                            "hover:bg-slate-200 dark:hover:bg-slate-700",
                            isActive && "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5",
                            isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
                        )} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                    {item.title}
                </TooltipContent>
            </Tooltip>
        );
    };

    return (
        <div className="flex flex-col items-center gap-2">
            {items.map((item) => (
                <NavButton key={item.url} item={item} />
            ))}
        </div>
    );
}
