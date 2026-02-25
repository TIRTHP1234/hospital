import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card'
import { Save } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const Settings: React.FC = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const [icuOccupancy, setIcuOccupancy] = useState(90)
    const [erWait, setErWait] = useState(60)
    const [isSaving, setIsSaving] = useState(false)

    // Fetch initial preferences
    const { data: preferences, isLoading } = useQuery({
        queryKey: ['user_preferences', user?.id],
        queryFn: async () => {
            if (!user) return null
            const { data, error } = await supabase
                .from('user_preferences')
                .select('alert_thresholds')
                .eq('user_id', user.id)
                .single()

            // If error is code PGRST116, it means 0 rows are returned which is expected for new users.
            if (error && error.code !== 'PGRST116') throw error
            return data
        },
        enabled: !!user
    })

    useEffect(() => {
        if (preferences?.alert_thresholds) {
            setIcuOccupancy(preferences.alert_thresholds.icu_occupancy || 90)
            setErWait(preferences.alert_thresholds.er_wait || 60)
        }
    }, [preferences])

    // Save preferences mutation
    const saveMutation = useMutation({
        mutationFn: async () => {
            if (!user) return

            const newThresholds = {
                icu_occupancy: icuOccupancy,
                er_wait: erWait
            }

            // Upsert the user into the public "users" table first to prevent foreign key errors. 
            // In a production app, this would normally be handled by a Supabase Postgres Trigger on user sign up.
            const { error: userError } = await supabase
                .from('users')
                .upsert({ id: user.id, email: user.email }, { onConflict: 'id' })

            if (userError) throw userError

            // Upsert user preferences
            const { error } = await supabase
                .from('user_preferences')
                .upsert(
                    {
                        user_id: user.id,
                        alert_thresholds: newThresholds
                    },
                    { onConflict: 'user_id' }
                )

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_preferences'] })
            setIsSaving(false)
            alert('Preferences saved successfully!')
        },
        onError: (error) => {
            setIsSaving(false)
            console.error(error)
            alert('Failed to save preferences. See console for details.')
        }
    })

    const handleSave = () => {
        setIsSaving(true)
        saveMutation.mutate()
    }

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading settings...</div>
    }

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
                                value={icuOccupancy}
                                onChange={(e) => setIcuOccupancy(Number(e.target.value))}
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
                                value={erWait}
                                onChange={(e) => setErWait(Number(e.target.value))}
                            />
                            <p className="mt-1 text-xs text-gray-500">Trigger alert when average ER wait exceeds target.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            disabled={isSaving}
                            onClick={handleSave}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
