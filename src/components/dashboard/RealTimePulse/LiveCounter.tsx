import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { useMetrics } from '@/hooks/useMetrics'
import { Activity } from 'lucide-react'

export const LiveCounter: React.FC = () => {
    const { data } = useMetrics()
    const [percent, setPercent] = useState(0)

    // Smoothly animate the circle when data changes
    useEffect(() => {
        if (data?.bedOccupancy !== undefined) {
            setPercent(Math.round(data.bedOccupancy))
        }
    }, [data?.bedOccupancy])

    const circumference = 2 * Math.PI * 40
    const strokeDashoffset = circumference - (percent / 100) * circumference

    return (
        <Card className="h-full flex flex-col justify-center items-center relative" noPadding>
            <CardHeader className="absolute top-0 left-0 right-0 border-b-0">
                <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500 animate-pulse" />
                    <CardTitle>Live Occupancy</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center p-8 mt-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-100"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            className={`transition-all duration-1000 ease-out ${percent > 90 ? 'text-red-500' : percent > 75 ? 'text-yellow-500' : 'text-green-500'
                                }`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">{percent}%</span>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-500 text-center font-medium">
                    {data?.currentAdmissions || 0} / {data?.totalBeds || 0} Beds Occupied
                </p>
            </CardContent>
        </Card>
    )
}
