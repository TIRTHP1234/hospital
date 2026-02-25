import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    noPadding?: boolean
}

export const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false, ...props }) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${noPadding ? '' : 'p-6'} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export const CardHeader: React.FC<CardProps> = ({ children, className = '', ...props }) => (
    <div className={`px-6 py-4 border-b border-gray-100 flex items-center justify-between ${className}`} {...props}>
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
