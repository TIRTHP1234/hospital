import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card'
import { Bell, AlertTriangle } from 'lucide-react'
import { useMetrics } from '@/hooks/useMetrics'

export const AlertsWidget: React.FC = () => {
    const { data } = useMetrics()
    const [alerts, setAlerts] = useState<{ id: string, message: string, time: Date }[]>([])

    // Simulated threshold monitor
    useEffect(() => {
        if (!data) return

        const newAlerts = []

        // Hardcoded thresholds (would normally come from user_preferences)
        if (data.bedOccupancy > 90) {
            newAlerts.push({
                id: 'occ',
                message: `High bed occupancy: ${data.bedOccupancy.toFixed(1)}%`,
                time: new Date()
            })
        }

        if (data.erWaitTime > 60) {
            newAlerts.push({
                id: 'wait',
                message: `ER Wait Time exceeds target: ${data.erWaitTime} min`,
                time: new Date()
            })
        }

        setAlerts(newAlerts)
    }, [data])

    return (
        <Card className="h-full" noPadding>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <CardTitle>Active Alerts</CardTitle>
                    {alerts.length > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {alerts.length}
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                        <Bell className="w-8 h-8 text-gray-300 mb-2" />
                        <p className="text-sm">All systems normal</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="flex gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                                <div>
                                    <p className="text-sm text-red-900 font-medium">{alert.message}</p>
                                    <p className="text-xs text-red-700 mt-1">
                                        {alert.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
