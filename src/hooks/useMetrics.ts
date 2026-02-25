import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export function useMetrics() {
    return useQuery({
        queryKey: ['metrics'],
        queryFn: async () => {
            // Simplified queries for dashboard metrics
            const { count: currentAdmissions } = await supabase
                .from('admissions')
                .select('*', { count: 'exact', head: true })
                .is('discharged_at', null)

            const { data: bedsData } = await supabase
                .from('departments')
                .select('total_beds')

            const totalBeds = bedsData?.reduce((acc, curr) => acc + curr.total_beds, 0) || 0

            const bedOccupancy = totalBeds > 0 && currentAdmissions !== null
                ? (currentAdmissions / totalBeds) * 100
                : 0

            // Generate a random-ish mock ER wait time for demo since we don't have a wait time table explicitly
            const erWaitTime = Math.floor(Math.random() * 30) + 30

            const { count: openComplaints } = await supabase
                .from('complaints')
                .select('*', { count: 'exact', head: true })
                .neq('status', 'resolved')

            const { count: staffOnDuty } = await supabase
                .from('staff')
                .select('*', { count: 'exact', head: true })
                .eq('on_duty', true)

            return {
                bedOccupancy,
                totalBeds,
                currentAdmissions,
                erWaitTime,
                openComplaints,
                staffOnDuty
            }
        }
    })
}
