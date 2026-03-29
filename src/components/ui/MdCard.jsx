import React from 'react';

export default function MdCard({ children, className = '' }) {
    return (
        <div className={`bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden ${className}`}>
            {children}
        </div>
    );
}