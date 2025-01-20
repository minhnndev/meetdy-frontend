import { cn } from "@/lib/utils";
import { t } from "i18next";
import React from "react";
import { Accept, useDropzone } from "react-dropzone";

interface DropzoneProps {
    onFileSelect: (file: File) => void;
    accept?: Accept;
    maxFiles?: number;
    placeholder?: string;
    height?: number;
    children?: React.ReactNode;
    className?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({
    onFileSelect,
    accept = { "image/*": [] },
    maxFiles = 1,
    placeholder = t("common.dropzone.placeholder"),
    height = 180,
    children,
    className,
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles && acceptedFiles.length > 0) {
                onFileSelect(acceptedFiles[0]);
            }
        },
        accept,
        maxFiles,
    });

    return (
        <div
            {...getRootProps()}
            className={cn("rounded-lg cursor-pointer", className)}
            style={{ height }}
        >
            <input {...getInputProps()} />
            {children ? <div>{children}</div> : <p>{placeholder}</p>}
        </div>
    );
};

export default Dropzone;
