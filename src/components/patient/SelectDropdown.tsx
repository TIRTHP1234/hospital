import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from './InputField'; // reuse the cn utility

const SelectDropdown = React.forwardRef(({ label, id, options, error, className, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 appearance-none",
                        "focus:outline-none focus:ring-2 focus:ring-hospital-blue/20 focus:border-hospital-blue",
                        "text-slate-800 cursor-pointer",
                        error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
                        className
                    )}
                    {...props}
                >
                    <option value="" disabled hidden>Select an option</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
});

SelectDropdown.displayName = 'SelectDropdown';

export default SelectDropdown;
