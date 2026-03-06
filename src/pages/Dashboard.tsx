import React from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { OverviewCards } from '@/components/dashboard/OverviewCards/OverviewCards'
import { DepartmentBarChart } from '@/components/dashboard/DepartmentChart/DepartmentBarChart'
import { ResolutionLineChart } from '@/components/dashboard/ResolutionTrend/ResolutionLineChart'
import { LiveCounter } from '@/components/dashboard/RealTimePulse/LiveCounter'
import { ActivityTable } from '@/components/dashboard/RecentActivity/ActivityTable'
import { AlertsWidget } from '@/components/dashboard/AlertsWidget/AlertsWidget'
import { ArrivalForecast } from '@/components/dashboard/Predictions/ArrivalForecast'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

export const Dashboard: React.FC = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Alerts at the very top for high visibility */}
            <motion.div variants={itemVariants} className="w-full">
                <AlertsWidget />
            </motion.div>

            {/* Top row: Key Metrics */}
            <motion.div variants={itemVariants}>
                <OverviewCards />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column (Charts) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <motion.div variants={itemVariants} className="w-full">
                        <DepartmentBarChart />
                    </motion.div>
                    <motion.div variants={itemVariants} className="w-full">
                        <ResolutionLineChart />
                    </motion.div>
                </div>

                {/* Right Column (Widgets) */}
                <div className="flex flex-col gap-6">
                    <motion.div variants={itemVariants} className="w-full">
                        <LiveCounter />
                    </motion.div>
                    <motion.div variants={itemVariants} className="w-full">
                        <ArrivalForecast />
                    </motion.div>
                </div>

            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 gap-6">
                <motion.div variants={itemVariants} className="w-full">
                    <ActivityTable />
                </motion.div>
            </div>
        </motion.div>
    )
}
