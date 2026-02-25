import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
import { subDays, format } from 'date-fns'

export function useResolutionTrends() {
    return useQuery({
        queryKey: ['resolution_trends'],
        queryFn: async () => {
            // 14 days ago calculation
            const fourteenDaysAgo = subDays(new Date(), 14).toISOString()

            // Fetch resolved complaints from the last 14 days
            const { data, error } = await supabase
                .from('complaints')
                .select('created_at, resolved_at')
                .not('resolved_at', 'is', null)
                .gte('created_at', fourteenDaysAgo)

            if (error) throw error

            // Group by day and calculate average hours based directly on the frontend
            // It's more cross-database compatible compared to `extract epoch` in some basic REST endpoints
            const dailyAverages: Record<string, { totalHours: number, count: number }> = {}

            // Initialize all 14 days
            for (let i = 13; i >= 0; i--) {
                const d = format(subDays(new Date(), i), 'MMM dd')
                dailyAverages[d] = { totalHours: 0, count: 0 }
            }

            data.forEach(item => {
                const day = format(new Date(item.created_at), 'MMM dd')
                if (!dailyAverages[day]) {
                    dailyAverages[day] = { totalHours: 0, count: 0 }
                }

                const created = new Date(item.created_at).getTime()
                const resolved = new Date(item.resolved_at!).getTime()
                const hoursDiff = (resolved - created) / (1000 * 60 * 60)

                dailyAverages[day].totalHours += hoursDiff
                dailyAverages[day].count += 1
            })

            // Map to array
            return Object.entries(dailyAverages).map(([day, stats]) => ({
                day,
                avgHours: stats.count > 0 ? parseFloat((stats.totalHours / stats.count).toFixed(1)) : 0
            }))
        }
    })
}
