import React from 'react';

export default function MdChip({ label }) {
    return (
        <span className="px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-700 text-xs font-semibold bg-indigo-50/50 whitespace-nowrap">
            {label}
        </span>
    );
}