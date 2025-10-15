import React from "react";
import {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import { formatSize} from "~/lib/utils";


interface FileUploaderProps {   // Prop for the uploader component
    onFileSelect?: (file : File | null) => void;
}

const Uploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;



    return(
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center">
                        <img src = "/icons/info.svg" alt = "upload" className="size-20"/>
                    </div>
                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-3">
                                <img src = "/images/pdf.png" alt = "pdf" className="size-10"/>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500 ">
                                        {formatSize(file.size)}
                                    </p>
                                </div>

                            </div>
                        </div>

                    ) : (
                        <div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">
                                    Click to Upload
                                </span> or drag and upload
                            </p>
                            <p className="text-lg text-gray-500">PDF (max 20MB) </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Uploader