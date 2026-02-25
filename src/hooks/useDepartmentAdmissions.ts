import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
import { subDays, startOfDay } from 'date-fns'

export function useDepartmentAdmissions() {
    return useQuery({
        queryKey: ['department_admissions'],
        queryFn: async () => {
            const sevenDaysAgo = startOfDay(subDays(new Date(), 7)).toISOString()

            // Fetch all departments
            const { data: departments } = await supabase.from('departments').select('id, name')

            if (!departments) return []

            // Fetch admissions from last 7 days
            const { data: admissions } = await supabase
                .from('admissions')
                .select('department_id')
                .gte('admitted_at', sevenDaysAgo)

            const counts = departments.map(d => ({
                id: d.id,
                name: d.name,
                admissions: 0
            }))

            admissions?.forEach(adm => {
                const dept = counts.find(c => c.id === adm.department_id)
                if (dept) {
                    dept.admissions += 1
                }
            })

            return counts.sort((a, b) => b.admissions - a.admissions)
        }
    })
}
