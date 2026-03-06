export type Role = 'admin' | 'manager'
export type ComplaintStatus = 'open' | 'in progress' | 'resolved'

export interface User {
    id: string
    email: string
    full_name: string
    role: Role
    created_at: string
}

export interface Department {
    id: number
    name: string
    description: string
    total_beds: number
}

export interface Patient {
    id: string
    full_name: string
    date_of_birth: string
    zip_code?: string
    created_at: string
}

export interface Admission {
    id: string
    patient_id: string
    department_id: number
    admitted_at: string
    discharged_at?: string | null
    bed_number?: string
    wait_time_minutes?: number
}

export interface Staff {
    id: string
    full_name: string
    department_id: number
    role: string
    on_duty: boolean
    created_at: string
}

export interface Complaint {
    id: string
    patient_id: string
    department_id: number
    description: string
    status: ComplaintStatus
    created_at: string
    resolved_at?: string | null
}

export interface Shift {
    id: number
    staff_id: string
    start_time: string
    end_time: string
}

export interface UserPreferences {
    id: string
    user_id: string
    alert_thresholds: Record<string, number>
    widget_layout?: any
}

export interface Prediction {
    id: number
    timestamp: string
    predicted_arrivals: number
    actual_arrivals?: number | null
}
