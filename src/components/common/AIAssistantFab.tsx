import React, { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

import { useMetrics } from '@/hooks/useMetrics'
import { useDepartmentAdmissions } from '@/hooks/useDepartmentAdmissions'
import { useResolutionTrends } from '@/hooks/useResolutionTrends'

export const AIAssistantFab: React.FC = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Fetch real data to construct dynamic insights
    const { data: metrics } = useMetrics()
    const { data: deptAdmissions } = useDepartmentAdmissions()
    const { data: trends } = useResolutionTrends()

    const handleInsightsClick = () => {
        setIsAnalyzing(true)

        const dynamicInsights: string[] = []

        if (metrics) {
            if (metrics.bedOccupancy > 85) {
                dynamicInsights.push(`Critical: Overall bed occupancy is extremely high at ${metrics.bedOccupancy.toFixed(1)}%. Consider reviewing early discharge candidates.`)
            } else if (metrics.bedOccupancy < 50) {
                dynamicInsights.push(`Bed occupancy is low (${metrics.bedOccupancy.toFixed(1)}%). Capacity is currently optimal for incoming transfers.`)
            } else {
                dynamicInsights.push(`Bed occupancy is manageable at ${metrics.bedOccupancy.toFixed(1)}%. Normal operations can continue.`)
            }

            if (metrics.erWaitTime > 45) {
                dynamicInsights.push(`Alert: ER wait times are elevated at ${metrics.erWaitTime} mins. Recommend prioritizing triage and opening an overflow room.`)
            } else {
                dynamicInsights.push(`ER wait times are stable at ${metrics.erWaitTime} mins.`)
            }

            if (metrics.openComplaints !== null && metrics.openComplaints > 10) {
                dynamicInsights.push(`Attention: There are ${metrics.openComplaints} open complaints. Staff should prioritize addressing patient concerns.`)
            }
        }

        if (deptAdmissions && deptAdmissions.length > 0) {
            const busiest = deptAdmissions[0]
            dynamicInsights.push(`${busiest.name} is currently the busiest department with ${busiest.admissions} recent admissions. Consider reallocating staff there if possible.`)
        }

        if (trends && trends.length >= 2) {
            const latest = trends[trends.length - 1]
            const previous = trends[trends.length - 2]
            if (latest.avgHours < previous.avgHours) {
                dynamicInsights.push(`Good news: Complaint resolution time improved to ${latest.avgHours} hours today compared to yesterday.`)
            } else if (latest.avgHours > previous.avgHours) {
                dynamicInsights.push(`Notice: Complaint resolution time increased to ${latest.avgHours} hours today. Please review resolution workflows.`)
            }
        }

        // Fallback if data is still loading or empty
        if (dynamicInsights.length === 0) {
            dynamicInsights.push("Analyzing real-time data... Data is currently within normal operating parameters.")
        }

        const randomInsight = dynamicInsights[Math.floor(Math.random() * dynamicInsights.length)];

        // Simulate AI thinking
        toast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden border border-white/50`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                            <Sparkles className="h-10 w-10 text-indigo-500 animate-pulse" />
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                                AI Analysis Complete
                            </p>
                            <p className="mt-1 text-sm text-gray-700">
                                {randomInsight}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:bg-white/50 hover:text-indigo-500 focus:outline-none"
                    >
                        Close
                    </button>
                </div>
            </div>
        ), { id: 'ai-insight', duration: 6000 })

        setTimeout(() => setIsAnalyzing(false), 2000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={handleInsightsClick}
                disabled={isAnalyzing}
                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-lg shadow-blue-500/40 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 disabled:opacity-80"
            >
                {isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                )}
                <span className="font-semibold tracking-wide">
                    {isAnalyzing ? 'Analyzing...' : 'AI Insights'}
                </span>
            </button>
        </div>
    )
}
