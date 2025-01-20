import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ALargeSmall, Maximize2, Minimize2, SendHorizontal } from "lucide-react";
import { memo, useState } from "react";

const ChatInput = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isRichText, setIsRichText] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const toggleRichText = () => {
        setIsRichText((prev) => !prev);
    };

    return (
        <div
            className={cn(
                "sticky bottom-0 p-4 bg-background transition-all duration-300 ease-in-out",
                {
                    "h-[80vh]": isExpanded,
                    "h-auto": !isExpanded,
                    "z-20": isExpanded,
                    "z-10": !isExpanded,
                }
            )}
        >
            <form className="relative flex flex-col justify-end h-full rounded-lg border bg-background p-1 transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-ring">
                {isRichText ? (
                    <div className="p-3"></div>
                ) : (
                    <textarea
                        value={inputValue}
                        placeholder="Type your message here..."
                        className={cn(
                            "w-full resize-none rounded-lg bg-background border-0 p-3 shadow-none outline-none transition-none",
                            {
                                "h-[calc(100%-48px)]": isExpanded,
                                "h-12": !isExpanded,
                            }
                        )}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                )}

                <div className="flex items-center p-3 pt-0">
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant={isRichText ? "secondary" : "ghost"}
                            type="button"
                            onClick={toggleRichText}
                        >
                            <ALargeSmall className="size-4" />
                            <span className="sr-only">Formatting</span>
                        </Button>

                        <Button
                            variant={isExpanded ? "secondary" : "ghost"}
                            type="button"
                            size="icon"
                            onClick={toggleExpand}
                        >
                            {isExpanded ? (
                                <>
                                    <Minimize2 className="size-4" />
                                    <span className="sr-only">Collapse</span>
                                </>
                            ) : (
                                <>
                                    <Maximize2 className="size-4" />
                                    <span className="sr-only">Expand</span>
                                </>
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="default"
                            disabled={inputValue === ""}
                            className="gap-1.5"
                        >
                            <SendHorizontal className="size-3.5" />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default memo(ChatInput);
