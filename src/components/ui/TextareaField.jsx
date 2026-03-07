import React from 'react';
import { cn } from './InputField';

const TextareaField = React.forwardRef(({ label, id, error, className, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                ref={ref}
                className={cn(
                    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 resize-y",
                    "focus:outline-none focus:ring-2 focus:ring-hospital-blue/20 focus:border-hospital-blue",
                    "placeholder:text-slate-400 text-slate-800",
                    error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
                    className
                )}
                {...props}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
});

TextareaField.displayName = 'TextareaField';

export default TextareaField;
