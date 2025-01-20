import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/commonUtils";
import { memo } from "react";

interface AvatarBaseProps {
    src?: string;
    alt?: string;
    placeholder?: string;
    rounded?: boolean;
    className?: string;
}
const AvatarBase = ({ src, alt, placeholder, rounded, className }: AvatarBaseProps) => {
    return (
        <Avatar className={cn("h-8 w-8", rounded && "rounded-lg", className)}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback className="rounded-lg">
                {getInitials(placeholder || "Example User")}
            </AvatarFallback>
        </Avatar>
    );
};

export default memo(AvatarBase);
