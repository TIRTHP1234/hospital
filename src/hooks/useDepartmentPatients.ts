import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
import { subDays, startOfDay } from 'date-fns'

export function useDepartmentPatients(departmentId: number | null) {
    return useQuery({
        queryKey: ['department_patients', departmentId],
        queryFn: async () => {
            if (!departmentId) return null

            // Fetch admissions mapping to this department that are currently admitted
            // or admitted within the last 24 hours.
            const yesterday = startOfDay(subDays(new Date(), 1)).toISOString()

            const { data, error } = await supabase
                .from('admissions')
                .select(`
          id,
          admitted_at,
          discharged_at,
          bed_number,
          patients (
            id,
            full_name,
            date_of_birth
          )
        `)
                .eq('department_id', departmentId)
                .or(`discharged_at.is.null,admitted_at.gte.${yesterday}`)
                .order('admitted_at', { ascending: false })

            if (error) throw error
            return data
        },
        enabled: !!departmentId
    })
}
