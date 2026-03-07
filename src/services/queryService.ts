import { supabase } from '../supabase/supabaseClient';
import emailjs from '@emailjs/browser';

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Submits a new patient query to Supabase and sends a confirmation email.
 * @param {Object} queryData 
 * @returns {Promise<Object>} The inserted database record
 */
export const submitPatientQuery = async (queryData) => {
    try {
        // 1. Insert data into Supabase
        const { data, error } = await supabase
            .from('patient_queries')
            .insert([
                {
                    name: queryData.name,
                    email: queryData.email,
                    phone: queryData.phone,
                    department: queryData.department,
                    symptoms: queryData.symptoms,
                    message: queryData.message,
                    urgency_level: queryData.urgency_level
                }
            ])
            .select()
            .single();

        if (error) throw error;

        // 2. Send confirmation email using EmailJS
        try {
            await emailjs.send(
                EMAIL_SERVICE_ID,
                EMAIL_TEMPLATE_ID,
                {
                    to_name: data.name,
                    to_email: data.email, // Required by most EmailJS configs if dynamic to address is used
                    query_id: data.id,
                    category: data.department
                },
                EMAIL_PUBLIC_KEY
            );
            console.log('Confirmation email sent successfully.');
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // We don't throw here to avoid failing the query submission if email fails
        }

        return data;
    } catch (err) {
        console.error('Error in submitPatientQuery:', err);
        throw err;
    }
};

/**
 * Staff service: Get all patient queries
 */
export const getPatientQueries = async () => {
    const { data, error } = await supabase
        .from('patient_queries')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};

/**
 * Staff service: Update a query status
 */
export const updateQueryStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('patient_queries')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Public service: Get a specific query status by ID
 */
export const getQueryById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('patient_queries')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error('Error fetching query:', err);
        throw err;
    }
};
