import React from 'react'
import { Bed, Clock, AlertCircle, Users } from 'lucide-react'
import { MetricCard } from './MetricCard'
import { useMetrics } from '@/hooks/useMetrics'
import { useRealtimeData } from '@/hooks/useRealtimeData'

export const OverviewCards: React.FC = () => {
    const { data, isLoading } = useMetrics()

    // Subscribe to real-time changes
    useRealtimeData('admissions', ['metrics'])
    useRealtimeData('complaints', ['metrics'])
    useRealtimeData('staff', ['metrics'])

    if (isLoading || !data) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl h-32 animate-pulse" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
                title="Bed Occupancy"
                value={data.bedOccupancy || 0}
                suffix="%"
                icon={Bed}
                colorClass="bg-blue-600"
            />
            <MetricCard
                title="ER Avg Wait Time"
                value={data.erWaitTime || 0}
                suffix=" min"
                icon={Clock}
                colorClass="bg-yellow-500"
            />
            <MetricCard
                title="Open Complaints"
                value={data.openComplaints || 0}
                icon={AlertCircle}
                colorClass="bg-red-500"
            />
            <MetricCard
                title="Staff on Duty"
                value={data.staffOnDuty || 0}
                icon={Users}
                colorClass="bg-green-500"
            />
        </div>
    )
}
