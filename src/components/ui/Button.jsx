import React from 'react';
import { cn } from './InputField';

const Button = React.forwardRef(({ children, variant = 'primary', className, isLoading, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-hospital-blue hover:bg-blue-600 text-white shadow-sm hover:shadow focus:ring-hospital-blue",
        secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm focus:ring-slate-200",
        outline: "border-2 border-hospital-blue text-hospital-blue hover:bg-hospital-blue/5 focus:ring-hospital-blue",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200",
    };

    const sizes = {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-5 py-2.5",
        lg: "text-lg px-6 py-3",
    };

    const size = props.size || 'md';

    return (
        <button
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </>
            ) : children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
