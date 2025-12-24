import { memo, useState, useRef, useCallback, KeyboardEvent, ChangeEvent } from "react";
import { Send, Paperclip, Image, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChannelMessage } from "@/hooks/channel/useChannelChat";

interface ChannelMessageInputProps {
    onSend: (content: string, replyMessageId?: string) => Promise<void>;
    onSendFile: (file: File) => Promise<void>;
    onTyping: (isTyping: boolean) => void;
    replyMessage: ChannelMessage | null;
    onCancelReply: () => void;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
}

const ACCEPTED_FILE_TYPES = "image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ChannelMessageInput = ({
    onSend,
    onSendFile,
    onTyping,
    replyMessage,
    onCancelReply,
    disabled = false,
    placeholder = "Type a message...",
    className,
}: ChannelMessageInputProps) => {
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleContentChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);

            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            onTyping(true);
            typingTimeoutRef.current = setTimeout(() => {
                onTyping(false);
            }, 2000);
        },
        [onTyping]
    );

    const handleSend = useCallback(async () => {
        if ((!content.trim() && selectedFiles.length === 0) || isSending) return;

        setIsSending(true);
        try {
            for (const file of selectedFiles) {
                await onSendFile(file);
            }

            if (content.trim()) {
                await onSend(content.trim(), replyMessage?._id);
            }

            setContent("");
            setSelectedFiles([]);
            onCancelReply();
            textareaRef.current?.focus();
        } finally {
            setIsSending(false);
        }
    }, [content, selectedFiles, isSending, onSend, onSendFile, replyMessage, onCancelReply]);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        },
        [handleSend]
    );

    const handleFileSelect = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || []);
            const validFiles = files.filter((file) => {
                if (file.size > MAX_FILE_SIZE) {
                    return false;
                }
                return true;
            });
            setSelectedFiles((prev) => [...prev, ...validFiles]);
            e.target.value = "";
        },
        []
    );

    const removeFile = useCallback((index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
        <div className={cn("border-t bg-background", className)}>
            {replyMessage && (
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b">
                    <div className="flex-1 min-w-0">
                        <span className="text-xs text-muted-foreground">
                            Replying to {replyMessage.user?.name}
                        </span>
                        <p className="text-sm truncate">{replyMessage.content}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={onCancelReply}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 px-4 py-2 border-b">
                    {selectedFiles.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm"
                        >
                            {file.type.startsWith("image/") ? (
                                <Image className="h-4 w-4" />
                            ) : (
                                <Paperclip className="h-4 w-4" />
                            )}
                            <span className="max-w-[150px] truncate">{file.name}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0"
                                onClick={() => removeFile(index)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-end gap-2 p-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 shrink-0"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={disabled}
                            >
                                <Paperclip className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Attach file</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 shrink-0"
                                onClick={() => imageInputRef.current?.click()}
                                disabled={disabled}
                            >
                                <Image className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Attach image</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_FILE_TYPES}
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                />
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                />

                <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                />

                <Button
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={handleSend}
                    disabled={disabled || isSending || (!content.trim() && selectedFiles.length === 0)}
                >
                    {isSending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default memo(ChannelMessageInput);
