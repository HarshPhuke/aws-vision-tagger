import React from 'react';
import { X, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MdSnackbar({ open, message, severity, onClose }) {
    if (!open) return null;
    const isError = severity === 'error';
    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg transition-all animate-in slide-in-from-bottom-5 fade-in duration-300 ${isError ? 'bg-red-100 text-red-900' : 'bg-slate-800 text-slate-50'}`}>
            {isError ? <AlertCircle size={20} className="text-red-600" /> : <CheckCircle2 size={20} className="text-green-400" />}
            <span className="font-medium text-sm">{message}</span>
            <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full ml-2 transition-colors">
                <X size={16} />
            </button>
        </div>
    );
}