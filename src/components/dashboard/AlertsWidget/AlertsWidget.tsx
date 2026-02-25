import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card'
import { Bell, AlertTriangle } from 'lucide-react'
import { useMetrics } from '@/hooks/useMetrics'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'
import { useQuery } from '@tanstack/react-query'

export const AlertsWidget: React.FC = () => {
    const { data } = useMetrics()
    const { user } = useAuth()
    const [alerts, setAlerts] = useState<{ id: string, message: string, time: Date }[]>([])

    // Fetch user preferences
    const { data: preferences } = useQuery({
        queryKey: ['user_preferences', user?.id],
        queryFn: async () => {
            if (!user) return null
            const { data, error } = await supabase
                .from('user_preferences')
                .select('alert_thresholds')
                .eq('user_id', user.id)
                .single()

            if (error && error.code !== 'PGRST116') throw error
            return data
        },
        enabled: !!user
    })

    // Simulated threshold monitor
    useEffect(() => {
        if (!data) return

        const thresholds = preferences?.alert_thresholds || { icu_occupancy: 90, er_wait: 60 }
        const currentIcuThreshold = thresholds.icu_occupancy || 90
        const currentErWaitThreshold = thresholds.er_wait || 60

        const newAlerts = []

        if (data.bedOccupancy > currentIcuThreshold) {
            newAlerts.push({
                id: 'occ',
                message: `High bed occupancy: ${data.bedOccupancy.toFixed(1)}% (Threshold: ${currentIcuThreshold}%)`,
                time: new Date()
            })
        }

        if (data.erWaitTime > currentErWaitThreshold) {
            newAlerts.push({
                id: 'wait',
                message: `ER Wait Time exceeds target: ${data.erWaitTime} min (Target: ${currentErWaitThreshold} min)`,
                time: new Date()
            })
        }

        setAlerts(newAlerts)
    }, [data, preferences])

    return (
        <Card className={`h-full transition-all duration-300 ${alerts.length > 0 ? 'border-red-300 shadow-md shadow-red-100' : ''}`} noPadding>
            <CardHeader className={alerts.length > 0 ? 'bg-red-50 border-b border-red-100' : ''}>
                <div className="flex items-center gap-2">
                    <Bell className={`w-5 h-5 ${alerts.length > 0 ? 'text-red-600' : 'text-gray-600'}`} />
                    <CardTitle className={alerts.length > 0 ? 'text-red-900' : ''}>Active Alerts</CardTitle>
                    {alerts.length > 0 && (
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                                {alerts.length} Critical
                            </span>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-4">
                {alerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500 h-full">
                        <Bell className="w-8 h-8 text-gray-300 mb-3" />
                        <p className="text-sm font-medium">All systems normal</p>
                        <p className="text-xs text-gray-400 mt-1">No alerts triggered</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="relative flex gap-3 bg-white p-4 rounded-xl border-l-4 border-l-red-500 border-y border-r border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="bg-red-100 p-2 rounded-lg shrink-0 h-fit">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-gray-900 mb-1">Threshold Exceeded</h4>
                                    <p className="text-sm text-gray-700 leading-snug">{alert.message}</p>
                                    <p className="text-xs font-medium text-red-500 mt-2 flex items-center gap-1">
                                        Triggered at {alert.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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
