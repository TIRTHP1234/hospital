import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChartCard } from '@/components/common/ChartCard'
import { useResolutionTrends } from '@/hooks/useResolutionTrends'
import { useRealtimeData } from '@/hooks/useRealtimeData'

export const ResolutionLineChart: React.FC = () => {
    const { data, isLoading } = useResolutionTrends()

    useRealtimeData('complaints', ['resolution_trends'])

    if (isLoading) {
        return (
            <ChartCard title="Resolution Trends" subtitle="Average complaint resolution time (Hrs)">
                <div className="w-full h-full animate-pulse bg-gray-100 rounded-lg"></div>
            </ChartCard>
        )
    }

    return (
        <ChartCard title="Resolution Trends" subtitle="Average complaint resolution time (Hrs)">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip
                        cursor={{ stroke: '#F3F4F6', strokeWidth: 2 }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="avgHours"
                        name="Avg Hours"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    )
}
