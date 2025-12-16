import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Maximize2,
    Minimize2,
    SendHorizontal,
    Paperclip,
    Image,
    AtSign,
    Smile,
    Hash,
} from "lucide-react";
import { memo, useState, useRef, useCallback, KeyboardEvent } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/redux/store";
import { toast } from "sonner";

const slashCommands = [
    { command: "/task", icon: "✓", label: "Add a task", description: "Create a new task item" },
    { command: "/table", icon: "⊞", label: "Insert table", description: "Add a table to the message" },
    { command: "/poll", icon: "📊", label: "Create poll", description: "Start a new poll" },
    { command: "/code", icon: "</>", label: "Code block", description: "Insert a code snippet" },
    { command: "/file", icon: "📎", label: "Attach file", description: "Upload and share a file" },
    { command: "/meeting", icon: "📅", label: "Schedule meeting", description: "Schedule a meeting" },
];

const quickEmojis = ["👍", "❤️", "😂", "🎉", "🔥", "👏", "😮", "😢"];

interface MentionSuggestion {
    _id: string;
    name: string;
    avatar?: string;
}

const ChatInput = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showSlashMenu, setShowSlashMenu] = useState<boolean>(false);
    const [showMentions, setShowMentions] = useState<boolean>(false);
    const [mentionFilter, setMentionFilter] = useState<string>("");
    const [slashFilter, setSlashFilter] = useState<string>("");
    const [selectedSuggestion, setSelectedSuggestion] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const { memberInConversation } = useAppSelector((state) => state.chat);

    const filteredCommands = slashCommands.filter((cmd) =>
        cmd.command.toLowerCase().includes(slashFilter.toLowerCase()) ||
        cmd.label.toLowerCase().includes(slashFilter.toLowerCase())
    );

    const filteredMembers = (memberInConversation || []).filter((member: MentionSuggestion) =>
        member.name?.toLowerCase().includes(mentionFilter.toLowerCase())
    );

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const cursorPosition = e.target.selectionStart;
        const textBeforeCursor = value.slice(0, cursorPosition);

        const slashMatch = textBeforeCursor.match(/\/(\w*)$/);
        if (slashMatch) {
            setShowSlashMenu(true);
            setSlashFilter(slashMatch[1]);
            setShowMentions(false);
            setSelectedSuggestion(0);
        } else {
            setShowSlashMenu(false);
            if (!textBeforeCursor.includes("@")) {
                setSelectedSuggestion(0);
            }
        }

        const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
        if (mentionMatch) {
            setShowMentions(true);
            setMentionFilter(mentionMatch[1]);
            setShowSlashMenu(false);
            setSelectedSuggestion(0);
        } else {
            setShowMentions(false);
            if (!textBeforeCursor.includes("/")) {
                setSelectedSuggestion(0);
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (showSlashMenu || showMentions) {
            const items = showSlashMenu ? filteredCommands : filteredMembers;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (items.length > 0) {
                    setSelectedSuggestion((prev) => (prev + 1) % items.length);
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (items.length > 0) {
                    setSelectedSuggestion((prev) => (prev - 1 + items.length) % items.length);
                }
            } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                if (showSlashMenu && filteredCommands[selectedSuggestion]) {
                    insertSlashCommand(filteredCommands[selectedSuggestion].command);
                } else if (showMentions && filteredMembers[selectedSuggestion]) {
                    insertMention(filteredMembers[selectedSuggestion]);
                }
            } else if (e.key === "Escape") {
                setShowSlashMenu(false);
                setShowMentions(false);
                setSelectedSuggestion(0);
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const insertSlashCommand = (command: string) => {
        const cursorPosition = textareaRef.current?.selectionStart || 0;
        const textBeforeCursor = inputValue.slice(0, cursorPosition);
        const textAfterCursor = inputValue.slice(cursorPosition);
        const newTextBefore = textBeforeCursor.replace(/\/\w*$/, command + " ");
        setInputValue(newTextBefore + textAfterCursor);
        setShowSlashMenu(false);
        toast.info(`Command ${command} inserted`);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.selectionStart = newTextBefore.length;
                textareaRef.current.selectionEnd = newTextBefore.length;
            }
        }, 0);
    };

    const insertMention = (member: MentionSuggestion) => {
        const cursorPosition = textareaRef.current?.selectionStart || 0;
        const textBeforeCursor = inputValue.slice(0, cursorPosition);
        const textAfterCursor = inputValue.slice(cursorPosition);
        const newTextBefore = textBeforeCursor.replace(/@\w*$/, `@${member.name} `);
        setInputValue(newTextBefore + textAfterCursor);
        setShowMentions(false);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.selectionStart = newTextBefore.length;
                textareaRef.current.selectionEnd = newTextBefore.length;
            }
        }, 0);
    };

    const insertEmoji = (emoji: string) => {
        const cursorPosition = textareaRef.current?.selectionStart || inputValue.length;
        const newValue =
            inputValue.slice(0, cursorPosition) + emoji + inputValue.slice(cursorPosition);
        setInputValue(newValue);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                const newPosition = cursorPosition + emoji.length;
                textareaRef.current.selectionStart = newPosition;
                textareaRef.current.selectionEnd = newPosition;
            }
        }, 0);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            toast.info(`Selected ${files.length} file(s) for upload`);
        }
    };

    const handleSend = useCallback(() => {
        if (!inputValue.trim()) return;
        console.log("Sending message:", inputValue);
        toast.info("Message sent (demo mode)");
        setInputValue("");
    }, [inputValue]);

    return (
        <div
            className={cn(
                "sticky bottom-0 p-4 bg-background transition-all duration-300 ease-in-out border-t",
                {
                    "h-[80vh]": isExpanded,
                    "h-auto": !isExpanded,
                    "z-20": isExpanded,
                    "z-10": !isExpanded,
                }
            )}
        >
            <div className="relative flex flex-col justify-end h-full rounded-xl border bg-card shadow-sm transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-ring/50">
                {(showSlashMenu && filteredCommands.length > 0) && (
                    <div className="absolute bottom-full left-0 mb-2 w-72 bg-popover border rounded-lg shadow-lg overflow-hidden z-50">
                        <div className="p-2 border-b bg-muted/50">
                            <p className="text-xs font-medium text-muted-foreground">Slash Commands</p>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                            {filteredCommands.map((cmd, index) => (
                                <button
                                    key={cmd.command}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent transition-colors",
                                        selectedSuggestion === index && "bg-accent"
                                    )}
                                    onClick={() => insertSlashCommand(cmd.command)}
                                >
                                    <span className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-md text-sm">
                                        {cmd.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">{cmd.label}</p>
                                        <p className="text-xs text-muted-foreground">{cmd.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {(showMentions && filteredMembers.length > 0) && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-popover border rounded-lg shadow-lg overflow-hidden z-50">
                        <div className="p-2 border-b bg-muted/50">
                            <p className="text-xs font-medium text-muted-foreground">Mention someone</p>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                            {filteredMembers.map((member: MentionSuggestion, index: number) => (
                                <button
                                    key={member._id}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent transition-colors",
                                        selectedSuggestion === index && "bg-accent"
                                    )}
                                    onClick={() => insertMention(member)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                        {member.name?.[0]?.toUpperCase() || "U"}
                                    </div>
                                    <span className="text-sm">{member.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <textarea
                    ref={textareaRef}
                    value={inputValue}
                    placeholder="Type a message... (Use / for commands, @ for mentions)"
                    className={cn(
                        "w-full resize-none rounded-t-xl bg-transparent border-0 px-4 py-3 shadow-none outline-none transition-none placeholder:text-muted-foreground/60",
                        {
                            "h-[calc(100%-56px)]": isExpanded,
                            "min-h-[48px] max-h-32": !isExpanded,
                        }
                    )}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <div className="flex items-center justify-between px-2 py-2 border-t">
                    <div className="flex items-center gap-1">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileSelect}
                            multiple
                        />
                        <input
                            type="file"
                            ref={imageInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                            multiple
                        />

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                        className="h-8 w-8"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Paperclip className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Attach file</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                        className="h-8 w-8"
                                        onClick={() => imageInputRef.current?.click()}
                                    >
                                        <Image className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Upload image</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            setInputValue((prev) => prev + "@");
                                            textareaRef.current?.focus();
                                        }}
                                    >
                                        <AtSign className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Mention someone</TooltipContent>
                            </Tooltip>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button size="icon" variant="ghost" type="button" className="h-8 w-8">
                                        <Smile className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2" align="start">
                                    <div className="flex gap-1">
                                        {quickEmojis.map((emoji) => (
                                            <button
                                                key={emoji}
                                                onClick={() => insertEmoji(emoji)}
                                                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-accent rounded transition-colors"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                        className="h-8 w-8"
                                        onClick={() => {
                                            setInputValue((prev) => prev + "/");
                                            textareaRef.current?.focus();
                                        }}
                                    >
                                        <Hash className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Slash commands</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant={isExpanded ? "secondary" : "ghost"}
                            type="button"
                            size="icon"
                            className="h-8 w-8"
                            onClick={toggleExpand}
                        >
                            {isExpanded ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                        </Button>
                        <Button
                            size="sm"
                            variant="default"
                            disabled={!inputValue.trim()}
                            className="gap-1.5 px-4"
                            onClick={handleSend}
                        >
                            <SendHorizontal className="h-4 w-4" />
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChatInput);
