import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://scaxsrhahsqnmcwvjazo.supabase.co';
const supabaseKey = 'sb_publishable__t-OCtZdp_gI4ftvhD3sWQ_ydmr8wQL';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Testing Supabase connection...");
    const { data: deptData } = await supabase.from('departments').select('*').limit(1);
    const { data: patientData } = await supabase.from('patients').select('*').limit(1);

    console.log("Success! DB Check:");
    console.log("Departments: ", deptData?.length > 0 ? 'Exists' : 'Empty');
    console.log("Patients: ", patientData?.length > 0 ? 'Exists' : 'Empty');
}

testConnection();
