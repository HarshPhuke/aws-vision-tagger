import React from 'react';
import { Search, UploadCloud, X } from 'lucide-react';

export default function Header({ searchInput, setSearchInput, handleSearchSubmit, handleClearSearch }) {
    return (
        <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
                        <UploadCloud size={24} />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 hidden sm:block tracking-tight">AWS Vision Tagger</h1>
                </div>

                <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={20} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search images by tag (e.g. dog, nature)..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white border-2 border-transparent focus:border-indigo-500 rounded-full py-3 pl-12 pr-12 text-slate-900 placeholder-slate-500 outline-none transition-all shadow-sm"
                    />
                    {searchInput && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700"
                        >
                            <X size={20} />
                        </button>
                    )}
                </form>
            </div>
        </header>
    );
}
