import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './Card'

interface ChartCardProps {
    title: string
    subtitle?: string
    children: React.ReactNode
    action?: React.ReactNode
    className?: string
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, action, className = '' }) => {
    return (
        <Card className={className} noPadding>
            <CardHeader>
                <div>
                    <CardTitle>{title}</CardTitle>
                    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                </div>
                {action && <div>{action}</div>}
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                {children}
            </CardContent>
        </Card>
    )
}
