import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://scaxsrhahsqnmcwvjazo.supabase.co';
const supabaseKey = 'sb_publishable__t-OCtZdp_gI4ftvhD3sWQ_ydmr8wQL';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Starting secure live seed...");

    // 1. Authenticate (Sign Up or Log In)
    const email = 'doctor_admin@hospital.com';
    const password = 'adminpassword123';

    console.log("Attempting to register new purely unconfirmed admin...", email);
    let { data: authData, error: authErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: 'Dr. Admin' } }
    });

    if (authErr && authErr.message.includes('already registered')) {
        console.log("User already exists, logging in...");
        const res = await supabase.auth.signInWithPassword({ email, password });
        authData = res.data;
        if (res.error) {
            console.error("Login failed:", res.error);
            return;
        }
    } else if (authErr) {
        console.error("Auth error:", authErr);
        return;
    }

    console.log("Authenticated new user successfully as:", authData.user.id);

    // 2. Insert User profile
    await supabase.from('users').upsert({
        id: authData.user.id,
        email,
        full_name: 'Dr. Admin',
        role: 'admin'
    });

    // Insert preferences
    await supabase.from('user_preferences').upsert({
        user_id: authData.user.id,
        alert_thresholds: { icu_occupancy: 90, er_wait: 60 }
    });

    console.log("SUCCESS! Please login with email:", email);

    return;

    // 3. Departments
    const depts = [
        { id: 1, name: 'ER', description: 'Emergency Room', total_beds: 20 },
        { id: 2, name: 'ICU', description: 'Intensive Care Unit', total_beds: 15 },
        { id: 3, name: 'Cardiology', description: 'Heart', total_beds: 30 },
        { id: 4, name: 'Pediatrics', description: 'Children', total_beds: 25 },
        { id: 5, name: 'Orthopedics', description: 'Bone', total_beds: 20 }
    ];
    await supabase.from('departments').upsert(depts);
    console.log("Departments seeded.");

    const { data: dbDepts } = await supabase.from('departments').select('id');

    // 4. Patients
    const patients = [];
    for (let i = 1; i <= 50; i++) {
        // Random date of birth
        const year = 1940 + Math.floor(Math.random() * 60);
        const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
        const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
        patients.push({
            full_name: `Patient ${i}`,
            date_of_birth: `${year}-${month}-${day}`,
            zip_code: String(10000 + Math.floor(Math.random() * 80000))
        });
    }
    const { data: insertedPatients } = await supabase.from('patients').insert(patients).select('id');
    console.log("Patients seeded.");

    // 5. Staff
    const staffRoles = ['doctor', 'nurse', 'technician'];
    const staffList = [];
    for (let i = 1; i <= 20; i++) {
        staffList.push({
            full_name: `Staff Member ${i}`,
            department_id: dbDepts[Math.floor(Math.random() * dbDepts.length)].id,
            role: staffRoles[Math.floor(Math.random() * staffRoles.length)],
            on_duty: Math.random() > 0.5
        });
    }
    await supabase.from('staff').insert(staffList);
    console.log("Staff seeded.");

    // 6. Admissions
    const admissions = [];
    for (let i = 1; i <= 100; i++) {
        const admittedAt = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        const dischargedAt = Math.random() > 0.3 ? new Date(admittedAt.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000) : null;

        admissions.push({
            patient_id: insertedPatients[Math.floor(Math.random() * insertedPatients.length)].id,
            department_id: dbDepts[Math.floor(Math.random() * dbDepts.length)].id,
            admitted_at: admittedAt.toISOString(),
            discharged_at: dischargedAt ? dischargedAt.toISOString() : null,
            wait_time_minutes: Math.floor(Math.random() * 120)
        });
    }
    await supabase.from('admissions').insert(admissions);
    console.log("Admissions seeded.");

    // 7. Complaints
    const complaints = [];
    const statuses = ['open', 'in progress', 'resolved'];
    for (let i = 1; i <= 50; i++) {
        const createdAt = new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const resolvedAt = status === 'resolved' ? new Date(createdAt.getTime() + Math.random() * 48 * 60 * 60 * 1000) : null;

        complaints.push({
            patient_id: insertedPatients[Math.floor(Math.random() * insertedPatients.length)].id,
            department_id: dbDepts[Math.floor(Math.random() * dbDepts.length)].id,
            description: `Complaint description for case ${i}`,
            status: status,
            created_at: createdAt.toISOString(),
            resolved_at: resolvedAt ? resolvedAt.toISOString() : null
        });
    }
    await supabase.from('complaints').insert(complaints);
    console.log("Complaints seeded.");

    console.log("All data successfully seeded to live Supabase project!");
}

seed();
