import Dropzone from "@/components/common/Dropzone";
import { Button } from "@/components/ui/button";
import { Camera, Pencil } from "lucide-react";
import { memo, useRef } from "react";
import { useTranslation } from "react-i18next";

interface UploadCoverImageProps {
    coverImg: string | File | null;
    setCoverImg: (coverImg: string | File | null) => void;
}

const UploadCoverImage: React.FC<UploadCoverImageProps> = ({ coverImg, setCoverImg }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const handleFileSelect = (file: File) => {
        setCoverImg(file);
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative w-full h-[180px] shadow-md rounded-lg">
            {coverImg ? (
                <div className="relative w-full h-full">
                    <img
                        src={
                            typeof coverImg === "string" ? coverImg : URL.createObjectURL(coverImg)
                        }
                        alt="Cover"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-2 right-2 rounded-full z-20"
                        onClick={handleEditClick}
                    >
                        <Pencil />
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                handleFileSelect(e.target.files[0]);
                            }
                        }}
                    />
                </div>
            ) : (
                <Dropzone
                    onFileSelect={handleFileSelect}
                    accept={{ "image/*": [] }}
                    height={180}
                    className="bg-gray-100 border-gray-300 flex flex-col items-center justify-center"
                >
                    <div className="flex items-center gap-2">
                        <p className="text-gray-500">{t("form.placeholder.coverImage")}</p>
                        <Camera className="w-5 h-5 text-gray-500" />
                    </div>
                </Dropzone>
            )}
        </div>
    );
};

export default memo(UploadCoverImage);
