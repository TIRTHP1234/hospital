import React from 'react'
import CountUp from 'react-countup'
import { Card, CardContent } from '@/components/common/Card'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
    title: string
    value: number
    prefix?: string
    suffix?: string
    icon: LucideIcon
    colorClass: string
    trend?: {
        value: number
        label: string
        isPositive: boolean
    }
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    prefix = '',
    suffix = '',
    icon: Icon,
    colorClass,
    trend
}) => {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                {prefix}
                                <CountUp end={value} duration={1.5} separator="," decimals={value % 1 !== 0 ? 1 : 0} />
                                {suffix}
                            </span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-xl ${colorClass}`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>

                {trend && (
                    <div className="mt-4 flex items-center text-sm">
                        <span className={`font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                        </span>
                        <span className="ml-2 text-gray-500">{trend.label}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
