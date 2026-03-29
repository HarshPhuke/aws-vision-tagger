import React from 'react';

export default function MdSkeleton({ type = 'rectangular', className = '' }) {
    const baseClass = "animate-pulse bg-slate-200";
    if (type === 'text') return <div className={`${baseClass} h-4 rounded-md ${className}`} />;
    if (type === 'chip') return <div className={`${baseClass} h-7 rounded-lg ${className}`} />;
    return <div className={`${baseClass} rounded-[28px] ${className}`} />;
}