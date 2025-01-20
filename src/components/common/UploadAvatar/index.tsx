import React, { memo, useState } from "react";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ShadCN Avatar
import Dropzone from "@/components/common/Dropzone";

interface UploadAvatarProps {
    avatar: string | null;
    setAvatar: (file: File | string | null) => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ avatar, setAvatar }) => {
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    const handleFileSelect = (file: File) => {
        const objectUrl = URL.createObjectURL(file);
        setPreviewImg(objectUrl);
        setAvatar(file);
    };

    return (
        <div className="flex items-center justify-center -mt-16 z-10">
            <Dropzone onFileSelect={handleFileSelect} height={96} className="bg-transparent">
                {!previewImg && !avatar ? (
                    <Avatar className="w-20 h-20 border-secondary shadow-md">
                        <AvatarFallback className="bg-gray-300">
                            <Camera className="w-6 h-6 text-secondary" />
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="relative w-20 h-20">
                        <Avatar
                            className="w-20 h-20 border border-secondary"
                            onMouseEnter={() => setVisible(true)}
                        >
                            <AvatarImage
                                src={previewImg || avatar || ""}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </Avatar>
                        {visible && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                                onMouseLeave={() => setVisible(false)}
                            >
                                <Camera className="w-6 h-6 text-secondary" />
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>
        </div>
    );
};

export default memo(UploadAvatar);
