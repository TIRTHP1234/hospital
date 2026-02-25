import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export function useActivity() {
    return useQuery({
        queryKey: ['recent_activity'],
        queryFn: async () => {
            // For a true union we could use an RPC, but for frontend simplicity
            // we'll fetch recently admitted, discharged, and complaints separately and merge them

            const { data: admissions } = await supabase
                .from('admissions')
                .select('id, admitted_at, discharged_at, patients(full_name), departments(name)')
                .order('admitted_at', { ascending: false })
                .limit(10)

            const { data: complaints } = await supabase
                .from('complaints')
                .select('id, created_at, status, patients(full_name), departments(name)')
                .order('created_at', { ascending: false })
                .limit(10)

            const activities: any[] = []

            admissions?.forEach(adm => {
                const patientName = (adm.patients as any)?.full_name || 'Unknown'
                const deptName = (adm.departments as any)?.name || 'Unknown'
                activities.push({
                    id: `adm-${adm.id}`,
                    timestamp: adm.admitted_at,
                    type: 'Admission',
                    description: `Patient ${patientName} admitted`,
                    department: deptName
                })
                if (adm.discharged_at) {
                    activities.push({
                        id: `dis-${adm.id}`,
                        timestamp: adm.discharged_at,
                        type: 'Discharge',
                        description: `Patient ${patientName} discharged`,
                        department: deptName
                    })
                }
            })

            complaints?.forEach(cmp => {
                const patientName = (cmp.patients as any)?.full_name || 'Unknown'
                const deptName = (cmp.departments as any)?.name || 'Unknown'
                activities.push({
                    id: `cmp-${cmp.id}`,
                    timestamp: cmp.created_at,
                    type: 'Complaint',
                    description: `New complaint logged (${cmp.status}) for ${patientName}`,
                    department: deptName
                })
            })

            // Sort by timestamp desc to get the real latest 10
            activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

            return activities.slice(0, 10)
        }
    })
}
