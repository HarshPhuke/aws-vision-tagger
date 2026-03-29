import React from 'react';
import { ImageOff } from 'lucide-react';
import MdCard from './ui/MdCard';
import MdSkeleton from './ui/MdSkeleton';
import MdChip from './ui/MdChip';

export default function ImageGallery({ isLoading, images, searchQuery, handleClearSearch }) {
    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Recent Uploads'}
                </h2>
                <span className="text-sm font-medium text-slate-500">
                    {isLoading ? 'Fetching...' : `${images.length} images`}
                </span>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(n => (
                        <MdCard key={n} className="flex flex-col">
                            <MdSkeleton className="w-full aspect-square !rounded-none" />
                            <div className="p-4 space-y-3">
                                <MdSkeleton type="text" className="w-2/3" />
                                <div className="flex gap-2">
                                    <MdSkeleton type="chip" className="w-16" />
                                    <MdSkeleton type="chip" className="w-20" />
                                </div>
                            </div>
                        </MdCard>
                    ))}
                </div>
            ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50">
                    <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                        <ImageOff size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No images found</h3>
                    <p className="text-slate-500 max-w-sm">
                        We couldn't find any images matching "{searchQuery}". Try a different search term or upload a new image.
                    </p>
                    {searchQuery && (
                        <button
                            onClick={handleClearSearch}
                            className="mt-6 px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-full transition-colors"
                        >
                            Clear Search
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((img, index) => (
                        <div
                            key={img.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <MdCard className="h-full flex flex-col group hover:shadow-md hover:border-indigo-100 transition-all duration-300">
                                <div className="relative aspect-square overflow-hidden bg-slate-100">
                                    <img
                                        src={img.imageUrl}
                                        alt={img.imageName}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white text-sm font-medium truncate">{img.imageName}</span>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-start">
                                    <div className="flex flex-wrap gap-2">
                                        {img.tags.map(tag => (
                                            <MdChip key={tag} label={tag} />
                                        ))}
                                    </div>
                                </div>
                            </MdCard>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}