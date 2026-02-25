import React from 'react'
import { OverviewCards } from '@/components/dashboard/OverviewCards/OverviewCards'
import { DepartmentBarChart } from '@/components/dashboard/DepartmentChart/DepartmentBarChart'
import { ResolutionLineChart } from '@/components/dashboard/ResolutionTrend/ResolutionLineChart'
import { LiveCounter } from '@/components/dashboard/RealTimePulse/LiveCounter'
import { ActivityTable } from '@/components/dashboard/RecentActivity/ActivityTable'
import { AlertsWidget } from '@/components/dashboard/AlertsWidget/AlertsWidget'
import { ArrivalForecast } from '@/components/dashboard/Predictions/ArrivalForecast'

export const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Top row: Key Metrics */}
            <OverviewCards />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (Charts) */}
                <div className="lg:col-span-2 space-y-6">
                    <DepartmentBarChart />
                    <ResolutionLineChart />
                </div>

                {/* Right Column (Widgets) */}
                <div className="space-y-6">
                    <LiveCounter />
                    <ArrivalForecast />
                </div>

            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                <div className="lg:col-span-2 h-full">
                    <ActivityTable />
                </div>
                <div className="h-full">
                    <AlertsWidget />
                </div>
            </div>
        </div>
    )
}
