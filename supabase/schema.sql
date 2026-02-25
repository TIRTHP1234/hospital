-- schema.sql
-- Create custom tables for Hospital Dashboard

-- 1. Departments
CREATE TABLE departments (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  total_beds int DEFAULT 0
);

-- 2. Users (Extends auth.users, assumed auth.users exists in Supabase)
-- Note: In a real Supabase project, you'd trigger this via auth hooks.
-- Here we define the public table.
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

-- 3. Patients
CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  date_of_birth date NOT NULL,
  zip_code text,
  created_at timestamptz DEFAULT now()
);

-- 4. Admissions
CREATE TABLE admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  department_id int REFERENCES departments(id) NOT NULL,
  admitted_at timestamptz DEFAULT now(),
  discharged_at timestamptz,
  bed_number text,
  wait_time_minutes int
);

-- 5. Staff
CREATE TABLE staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  department_id int REFERENCES departments(id) NOT NULL,
  role text NOT NULL,
  on_duty boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 6. Complaints
CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  department_id int REFERENCES departments(id) NOT NULL,
  description text NOT NULL,
  status text CHECK (status IN ('open','in progress','resolved')) DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- 7. Shifts
CREATE TABLE shifts (
  id serial PRIMARY KEY,
  staff_id uuid REFERENCES staff(id) ON DELETE CASCADE NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL
);

-- 8. User Preferences
CREATE TABLE user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  alert_thresholds jsonb DEFAULT '{"icu_occupancy": 90, "er_wait": 60}'::jsonb,
  widget_layout jsonb
);

-- 9. Predictions
CREATE TABLE predictions (
  id serial PRIMARY KEY,
  timestamp timestamptz NOT NULL,
  predicted_arrivals int NOT NULL,
  actual_arrivals int
);

-- Enable RLS and simple policies
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users full access for hackathon simplicity
CREATE POLICY "Allow all to authenticated on departments" ON departments FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on users" ON users FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on patients" ON patients FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on admissions" ON admissions FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on staff" ON staff FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on complaints" ON complaints FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on shifts" ON shifts FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on user_preferences" ON user_preferences FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow all to authenticated on predictions" ON predictions FOR ALL TO authenticated USING (true);

-- Turn on Realtime for these tables
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE admissions;
ALTER PUBLICATION supabase_realtime ADD TABLE complaints;
ALTER PUBLICATION supabase_realtime ADD TABLE staff;
