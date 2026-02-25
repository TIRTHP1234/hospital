import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { ChartCard } from '@/components/common/ChartCard'
import { useDepartmentAdmissions } from '@/hooks/useDepartmentAdmissions'
import { useRealtimeData } from '@/hooks/useRealtimeData'
import { DepartmentDrillDown } from './DepartmentDrillDown'

export const DepartmentBarChart: React.FC = () => {
    const { data, isLoading } = useDepartmentAdmissions()
    const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null)

    useRealtimeData('admissions', ['department_admissions'])

    if (isLoading) {
        return (
            <ChartCard title="Workload Distribution" subtitle="Admissions per department (Last 7 days)">
                <div className="w-full h-full animate-pulse bg-gray-100 rounded-lg"></div>
            </ChartCard>
        )
    }

    return (
        <>
            <ChartCard title="Workload Distribution" subtitle="Admissions per department (Last 7 days)">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip
                            cursor={{ fill: '#F3F4F6' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar
                            dataKey="admissions"
                            radius={[4, 4, 0, 0]}
                            onClick={(data: any) => {
                                if (data && data.payload && data.payload.id) setSelectedDeptId(Number(data.payload.id))
                            }}
                        >
                            {data?.map((_entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill="#3B82F6"
                                    className="hover:fill-blue-700 hover:cursor-pointer transition-colors"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>

            {selectedDeptId && (
                <DepartmentDrillDown
                    departmentId={selectedDeptId}
                    onClose={() => setSelectedDeptId(null)}
                />
            )}
        </>
    )
}
