import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card'
import { Save } from 'lucide-react'

export const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your dashboard preferences and alerts.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Alert Thresholds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ICU Occupancy Alert (%)
                            </label>
                            <input
                                type="number"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border py-2 px-3"
                                defaultValue={90}
                            />
                            <p className="mt-1 text-xs text-gray-500">Trigger alert when ICU beds are over this capacity.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ER Wait Time Target (Mins)
                            </label>
                            <input
                                type="number"
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border py-2 px-3"
                                defaultValue={60}
                            />
                            <p className="mt-1 text-xs text-gray-500">Trigger alert when average ER wait exceeds target.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                            <Save className="w-4 h-4 mr-2" />
                            Save Preferences
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
