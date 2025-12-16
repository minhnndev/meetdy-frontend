import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
    onClose: () => void;
    position?: "left" | "right";
}

const quickEmojis = ["👍", "❤️", "😂", "😮", "😢", "🎉", "🔥", "👏"];

const EmojiPicker = memo(({ onSelect, onClose, position = "right" }: EmojiPickerProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={ref}
            className={cn(
                "absolute bottom-full mb-2 flex items-center gap-1 p-2 bg-background border rounded-full shadow-lg z-50",
                position === "left" ? "right-0" : "left-0"
            )}
        >
            {quickEmojis.map((emoji) => (
                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                    className="w-8 h-8 flex items-center justify-center text-lg hover:bg-accent rounded-full transition-colors"
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
});

EmojiPicker.displayName = "EmojiPicker";

export default EmojiPicker;
