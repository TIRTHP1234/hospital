import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useQueryClient } from '@tanstack/react-query'

export function useRealtimeData(table: string, queryKey: string[]) {
    const queryClient = useQueryClient()

    useEffect(() => {
        const channel = supabase
            .channel(`${table}-changes`)
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table },
                (payload) => {
                    console.log(`Realtime update on ${table}:`, payload)
                    // Invalidate the query to fetch fresh data
                    queryClient.invalidateQueries({ queryKey })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [table, queryKey, queryClient])
}
