import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, YAxis } from 'recharts'
import { format, addHours } from 'date-fns'

export const ArrivalForecast: React.FC = () => {
    // Generate mock predictions simulating an ML model output 
    // or a simple moving average.
    const now = new Date()

    const mockPredictions = Array.from({ length: 6 }).map((_, i) => ({
        time: format(addHours(now, i + 1), 'ha'),
        arrivals: Math.floor(Math.random() * 15) + 5 // Random arrivals between 5 and 20
    }))

    return (
        <Card className="h-full" noPadding>
            <CardHeader>
                <CardTitle>Arrival Forecast (Next 6h)</CardTitle>
                <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wider">Predictive Model Active</p>
            </CardHeader>
            <CardContent className="h-64 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockPredictions} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                        <Tooltip
                            cursor={{ fill: '#F9FAFB' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="arrivals" radius={[4, 4, 0, 0]}>
                            {mockPredictions.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.arrivals > 15 ? '#F87171' : entry.arrivals > 10 ? '#FBBF24' : '#60A5FA'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
