import React from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { useActivity } from '@/hooks/useActivity'
import { useRealtimeData } from '@/hooks/useRealtimeData'
import { UserPlus, UserMinus, AlertTriangle } from 'lucide-react'

export const ActivityTable: React.FC = () => {
    const { data, isLoading } = useActivity()

    useRealtimeData('admissions', ['recent_activity'])
    useRealtimeData('complaints', ['recent_activity'])

    const getIcon = (type: string) => {
        switch (type) {
            case 'Admission': return <UserPlus className="w-4 h-4 text-blue-500" />
            case 'Discharge': return <UserMinus className="w-4 h-4 text-green-500" />
            case 'Complaint': return <AlertTriangle className="w-4 h-4 text-red-500" />
            default: return null
        }
    }

    return (
        <Card className="h-full flex flex-col" noPadding>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
                {isLoading ? (
                    <div className="p-6 space-y-4 animate-pulse">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-10 bg-gray-100 rounded"></div>
                        ))}
                    </div>
                ) : (
                    <div className="min-w-full divide-y divide-gray-200">
                        {data?.map((activity) => (
                            <div key={activity.id} className="p-4 hover:bg-gray-50 flex items-start gap-4 transition-colors">
                                <div className={`p-2 rounded-full ${activity.type === 'Admission' ? 'bg-blue-50' :
                                        activity.type === 'Discharge' ? 'bg-green-50' : 'bg-red-50'
                                    }`}>
                                    {getIcon(activity.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {activity.description}
                                    </p>
                                    <p className="text-sm text-gray-500 flex gap-2">
                                        <span>{activity.department}</span>
                                        <span>&bull;</span>
                                        <span>{format(new Date(activity.timestamp), 'MMM d, h:mm a')}</span>
                                    </p>
                                </div>
                                <div className="whitespace-nowrap px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-800">
                                    {activity.type}
                                </div>
                            </div>
                        ))}

                        {data?.length === 0 && (
                            <div className="p-8 text-center text-gray-500">No recent activity found.</div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
