import { useEffect, useState } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

export function useAuth() {
    const mockUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'doctor_admin@hospital.com',
        user_metadata: { full_name: 'Dr. Admin' }
    } as User;

    const mockSession = {
        user: mockUser,
        access_token: 'mock_token'
    } as Session;

    const [user, setUser] = useState<User | null>(mockUser)
    const [session, setSession] = useState<Session | null>(mockSession)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Bypass actual auth for hackathon speed
        setLoading(false)
        setUser(mockUser)
        setSession(mockSession)
    }, [])

    return { user, session, loading, supabase }
}
