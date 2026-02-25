-- seed.sql
-- Seed data for Hospital Dashboard

-- 1. Departments
INSERT INTO departments (name, description, total_beds) VALUES
('ER', 'Emergency Room', 20),
('ICU', 'Intensive Care Unit', 15),
('Cardiology', 'Heart and vascular care', 30),
('Pediatrics', 'Children and adolescent care', 25),
('Orthopedics', 'Bone and joint care', 20)
ON CONFLICT (name) DO NOTHING;

-- 2. Staff (20 members)
DO $$
DECLARE
  v_dept_id int;
  roles text[] := ARRAY['doctor', 'nurse', 'technician'];
BEGIN
  FOR i IN 1..20 LOOP
    SELECT id INTO v_dept_id FROM departments ORDER BY random() LIMIT 1;
    INSERT INTO staff (full_name, department_id, role, on_duty)
    VALUES (
      'Staff Member ' || i,
      v_dept_id,
      roles[floor(random() * 3) + 1],
      random() > 0.5
    );
  END LOOP;
END $$;

-- 3. Patients (50 patients)
DO $$
BEGIN
  FOR i IN 1..50 LOOP
    INSERT INTO patients (full_name, date_of_birth, zip_code)
    VALUES (
      'Patient ' || i,
      (now() - (random() * interval '80 years') - interval '18 years')::date,
      (floor(random() * 90000) + 10000)::text
    );
  END LOOP;
END $$;

-- 4. Admissions (100 admissions)
DO $$
DECLARE
  v_patient_id uuid;
  v_department_id int;
  v_admitted_at timestamptz;
BEGIN
  FOR i IN 1..100 LOOP
    SELECT id INTO v_patient_id FROM patients ORDER BY random() LIMIT 1;
    SELECT id INTO v_department_id FROM departments ORDER BY random() LIMIT 1;
    v_admitted_at := now() - (random() * interval '30 days');

    INSERT INTO admissions (patient_id, department_id, admitted_at, discharged_at, wait_time_minutes)
    VALUES (
      v_patient_id,
      v_department_id,
      v_admitted_at,
      CASE WHEN random() > 0.3 THEN v_admitted_at + (random() * interval '5 days') ELSE NULL END,
      (random() * 120)::int
    );
  END LOOP;
END $$;

-- 5. Complaints (50 complaints)
DO $$
DECLARE
  v_patient_id uuid;
  v_department_id int;
  v_created_at timestamptz;
  v_status text;
  statuses text[] := ARRAY['open', 'in progress', 'resolved'];
BEGIN
  FOR i IN 1..50 LOOP
    SELECT id INTO v_patient_id FROM patients ORDER BY random() LIMIT 1;
    SELECT id INTO v_department_id FROM departments ORDER BY random() LIMIT 1;
    v_created_at := now() - (random() * interval '14 days');
    v_status := statuses[floor(random() * 3) + 1];

    INSERT INTO complaints (patient_id, department_id, description, status, created_at, resolved_at)
    VALUES (
      v_patient_id,
      v_department_id,
      'Complaint description for case ' || i,
      v_status,
      v_created_at,
      CASE WHEN v_status = 'resolved' THEN v_created_at + (random() * interval '48 hours') ELSE NULL END
    );
  END LOOP;
END $$;

-- Note: User admin@hospital.com should be created via Supabase Auth UI / API.
-- The public.users table will automatically get generated if you set up an auth trigger,
-- or you can manually insert the UUID after creating the user in Auth.
