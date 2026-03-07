import { supabase } from '../supabase/supabaseClient';

/**
 * Submits a new appointment request to Supabase.
 * @param {Object} appointmentData 
 * @returns {Promise<Object>} The inserted database record
 */
export const createAppointment = async (appointmentData) => {
    try {
        const { data, error } = await supabase
            .from('appointments')
            .insert([
                {
                    patient_name: appointmentData.patient_name,
                    email: appointmentData.email,
                    phone: appointmentData.phone,
                    department: appointmentData.department,
                    doctor: appointmentData.doctor,
                    appointment_date: appointmentData.appointment_date,
                    time_slot: appointmentData.time_slot,
                    reason: appointmentData.reason
                }
            ])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error in createAppointment:', err);
        throw err;
    }
};

/**
 * Staff service: Get all appointments
 */
export const getAppointments = async () => {
    const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true });

    if (error) throw error;
    return data;
};
