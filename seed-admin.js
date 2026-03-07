import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log("Starting secure live seed for admin...");

    const email = 'doctor_admin@hospital.com';
    const password = 'adminpassword123';

    let { data: authData, error: authErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: 'Dr. Admin' } }
    });

    if (authErr && authErr.message.includes('already registered')) {
        console.log("User already exists, logging in instead...");
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

    console.log("Authenticated user successfully as:", authData.user?.id);

    if (authData.user) {
        const { error: upsertErr } = await supabase.from('users').upsert({
            id: authData.user.id,
            email,
            full_name: 'Dr. Admin',
            role: 'admin'
        });
        if (upsertErr) {
            console.error("Error upserting to public.users table (might already exist or not exist):", upsertErr);
        } else {
            console.log("Upserted user profile to users table.");
        }
    }

    console.log("SUCCESS! Please login with email:", email);
}

seed();
