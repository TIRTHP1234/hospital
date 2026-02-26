import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Patient {
    id: string;
    full_name: string;
    date_of_birth: string;
    zip_code?: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface Admission {
    id: string;
    patient_id: string;
    department_id: number;
    admitted_at: string;
    discharged_at: string | null;
    bed_number?: string;
    patient: {
        full_name: string;
        date_of_birth: string;
    };
    department: {
        name: string;
    };
}

export const useRegistration = () => {
    const [admissions, setAdmissions] = useState<Admission[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch initial data
    const fetchInitialData = async () => {
        try {
            setLoading(true);

            // Fetch departments
            const { data: deptData, error: deptError } = await supabase
                .from('departments')
                .select('id, name')
                .order('name');

            if (deptError) throw deptError;
            setDepartments(deptData || []);

            // Fetch admissions with patient and department details
            const { data: adminData, error: adminError } = await supabase
                .from('admissions')
                .select(`
                    id,
                    patient_id,
                    department_id,
                    admitted_at,
                    discharged_at,
                    bed_number,
                    patient:patients(full_name, date_of_birth),
                    department:departments(name)
                `)
                .order('admitted_at', { ascending: false });

            if (adminError) throw adminError;

            // Format data appropriately
            const formattedAdmissions = (adminData || []).map((item: any) => ({
                ...item,
                patient: Array.isArray(item.patient) ? item.patient[0] : item.patient,
                department: Array.isArray(item.department) ? item.department[0] : item.department
            })) as unknown as Admission[];

            setAdmissions(formattedAdmissions);
        } catch (err: any) {
            console.error('Error fetching registration data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitialData();

        // Subscribe to real-time changes on admissions
        const admissionsSubscription = supabase
            .channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'admissions' },
                () => {
                    // Refetch all to get the joined patient/department data easily
                    fetchInitialData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(admissionsSubscription);
        };
    }, []);

    // Action to admit a new patient
    const admitPatient = async (
        patientData: Omit<Patient, 'id'>,
        departmentId: number
    ) => {
        try {
            setLoading(true);
            setError(null);

            // 1. Insert patient
            const { data: newPatient, error: patientError } = await supabase
                .from('patients')
                .insert([patientData])
                .select()
                .single();

            if (patientError) throw patientError;

            // 2. Insert admission record
            const admissionData = {
                patient_id: newPatient.id,
                department_id: departmentId,
                admitted_at: new Date().toISOString()
            };

            const { error: admissionError } = await supabase
                .from('admissions')
                .insert([admissionData]);

            if (admissionError) throw admissionError;

        } catch (err: any) {
            console.error('Error admitting patient:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Action to discharge a patient
    const dischargePatient = async (admissionId: string) => {
        try {
            setLoading(true);
            setError(null);

            const { error } = await supabase
                .from('admissions')
                .update({ discharged_at: new Date().toISOString() })
                .eq('id', admissionId);

            if (error) throw error;
        } catch (err: any) {
            console.error('Error discharging patient:', err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        admissions,
        departments,
        loading,
        error,
        admitPatient,
        dischargePatient,
        refreshData: fetchInitialData
    };
};
