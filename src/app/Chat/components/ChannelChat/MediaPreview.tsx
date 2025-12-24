import { memo, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MediaItem {
    id: string;
    name: string;
    type: string;
    url: string;
}

interface MediaPreviewProps {
    media: MediaItem | null;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (direction: "next" | "prev") => void;
    hasNext?: boolean;
    hasPrev?: boolean;
}

const MediaPreview = ({
    media,
    isOpen,
    onClose,
    onNavigate,
    hasNext = true,
    hasPrev = true,
}: MediaPreviewProps) => {
    const isImage = media?.type?.startsWith("image");
    const isVideo = media?.type?.startsWith("video");

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "ArrowLeft" && hasPrev) onNavigate("prev");
            if (e.key === "ArrowRight" && hasNext) onNavigate("next");
            if (e.key === "Escape") onClose();
        },
        [isOpen, hasPrev, hasNext, onNavigate, onClose]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const handleDownload = () => {
        if (!media) return;
        const link = document.createElement("a");
        link.href = media.url;
        link.download = media.name;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
                <VisuallyHidden>
                    <DialogTitle>Media Preview</DialogTitle>
                </VisuallyHidden>
                <div className="relative flex items-center justify-center min-h-[80vh]">
                    <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20"
                            onClick={handleDownload}
                        >
                            <Download className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-white hover:bg-white/20"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {hasPrev && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 h-12 w-12 text-white hover:bg-white/20 z-50"
                            onClick={() => onNavigate("prev")}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </Button>
                    )}

                    {hasNext && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 h-12 w-12 text-white hover:bg-white/20 z-50"
                            onClick={() => onNavigate("next")}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>
                    )}

                    <div className="flex items-center justify-center p-8">
                        {isImage && media && (
                            <img
                                src={media.url}
                                alt={media.name}
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                        )}
                        {isVideo && media && (
                            <video
                                src={media.url}
                                controls
                                autoPlay
                                className="max-w-full max-h-[80vh]"
                            />
                        )}
                        {!isImage && !isVideo && media && (
                            <div className="flex flex-col items-center gap-4 text-white">
                                <div className="text-6xl">📄</div>
                                <p className="text-lg">{media.name}</p>
                                <Button onClick={handleDownload}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        )}
                    </div>

                    {media && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                            {media.name}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(MediaPreview);
