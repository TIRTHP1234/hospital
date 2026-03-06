import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    noPadding?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false, ...props }) => {
    return (
        <div
            className={`bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/50 overflow-hidden ${noPadding ? '' : 'p-6'} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <div className={`px-6 py-4 border-b border-white/40 flex items-center justify-between ${className}`} {...props}>
        {children}
    </div>
)

export const CardTitle: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
        {children}
    </h3>
)

export const CardContent: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <div className={`p-6 ${className}`} {...props}>
        {children}
    </div>
)
