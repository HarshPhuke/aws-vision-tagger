import React from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import MdCard from './ui/MdCard';

export default function UploadSection({ isUploading, uploadFile, uploadProgress, handleFileSelect, fileInputRef }) {
    return (
        <MdCard className="bg-indigo-50/30 border-indigo-100 border-2">
            <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center">
                {!isUploading ? (
                    <>
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud size={32} />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900 mb-2">Upload Image for Analysis</h2>
                        <p className="text-slate-500 mb-6 max-w-md">
                            JPEG, PNG up to 5MB. Our AWS Rekognition pipeline will automatically tag your image.
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Select Image
                        </button>
                    </>
                ) : (
                    <div className="w-full max-w-md py-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-indigo-900">Uploading {uploadFile?.name}...</span>
                            <span className="text-sm font-bold text-indigo-600">{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-600 transition-all duration-300 ease-out rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <div className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-2">
                            <Loader2 size={14} className="animate-spin" />
                            Connecting to AWS S3...
                        </div>
                    </div>
                )}
            </div>
        </MdCard>
    );
}