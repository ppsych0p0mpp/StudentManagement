-- Insert sample admin (password: admin123)
-- Note: In production, use bcrypt to hash passwords
INSERT INTO admins (email, password_hash, full_name) VALUES
('admin@school.edu', '$2a$10$rN8kX9YZH0p8LwGZvXqKAeYPKQf.X0Q0p0F.KzH0p8LwGZvXqKAeO', 'Admin User')
ON CONFLICT (email) DO NOTHING;

-- Insert sample students (password: student123)
INSERT INTO students (student_id, full_name, email, phone, program, year, section, password_hash) VALUES
('2024001', 'John Doe', 'john.doe@school.edu', '555-0101', 'Computer Science', 1, 'A', '$2a$10$rN8kX9YZH0p8LwGZvXqKAeYPKQf.X0Q0p0F.KzH0p8LwGZvXqKAeO'),
('2024002', 'Jane Smith', 'jane.smith@school.edu', '555-0102', 'Computer Science', 1, 'A', '$2a$10$rN8kX9YZH0p8LwGZvXqKAeYPKQf.X0Q0p0F.KzH0p8LwGZvXqKAeO'),
('2024003', 'Mike Johnson', 'mike.johnson@school.edu', '555-0103', 'Information Technology', 2, 'B', '$2a$10$rN8kX9YZH0p8LwGZvXqKAeYPKQf.X0Q0p0F.KzH0p8LwGZvXqKAeO'),
('2024004', 'Sarah Williams', 'sarah.williams@school.edu', '555-0104', 'Computer Science', 1, 'A', '$2a$10$rN8kX9YZH0p8LwGZvXqKAeYPKQf.X0Q0p0F.KzH0p8LwGZvXqKAeO'),
('2024005', 'David Brown', 'david.brown@school.edu', '555-0105', 'Information Technology', 2, 'B', '$2a$10$rN8kX9YZH0p8LwGZvXqKAeYPKQf.X0Q0p0F.KzH0p8LwGZvXqKAeO')
ON CONFLICT (student_id) DO NOTHING;

-- Insert sample attendance records
INSERT INTO attendance_records (student_id, date, status, subject, time_in, time_out) 
SELECT 
  s.id,
  CURRENT_DATE - INTERVAL '1 day',
  'present',
  'Mathematics',
  (CURRENT_DATE - INTERVAL '1 day') + TIME '08:00:00',
  (CURRENT_DATE - INTERVAL '1 day') + TIME '10:00:00'
FROM students s
WHERE s.student_id IN ('2024001', '2024002', '2024004')
ON CONFLICT (student_id, date, subject) DO NOTHING;

INSERT INTO attendance_records (student_id, date, status, subject) 
SELECT 
  s.id,
  CURRENT_DATE - INTERVAL '1 day',
  'absent',
  'Mathematics'
FROM students s
WHERE s.student_id IN ('2024003', '2024005')
ON CONFLICT (student_id, date, subject) DO NOTHING;
