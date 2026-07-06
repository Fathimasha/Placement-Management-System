-- Smart Placement Management System
-- MySQL schema

CREATE DATABASE IF NOT EXISTS placement_db;
USE placement_db;

DROP TABLE IF EXISTS placements;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no VARCHAR(50) NOT NULL UNIQUE,
    branch VARCHAR(50) NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL,
    backlogs INT NOT NULL DEFAULT 0,
    email VARCHAR(100),
    phone VARCHAR(15)
);

CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    job_role VARCHAR(100),
    package_lpa DECIMAL(5,2),
    min_cgpa DECIMAL(3,2) NOT NULL DEFAULT 0,
    max_backlogs INT NOT NULL DEFAULT 0,
    eligible_branches VARCHAR(255) NOT NULL, -- comma separated, e.g. "CSE,IT,ECE"
    drive_date DATE
);

CREATE TABLE placements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    company_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'APPLIED', -- APPLIED, SELECTED, REJECTED
    applied_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (student_id, company_id)
);

-- Sample data (optional, remove if not needed)
INSERT INTO students (name, roll_no, branch, cgpa, backlogs, email, phone) VALUES
('Arjun Reddy', 'CSE001', 'CSE', 8.50, 0, 'arjun@example.com', '9876543210'),
('Priya Sharma', 'IT002', 'IT', 7.20, 1, 'priya@example.com', '9876543211'),
('Karthik Rao', 'ECE003', 'ECE', 6.80, 2, 'karthik@example.com', '9876543212'),
('Sneha Gupta', 'CSE004', 'CSE', 9.10, 0, 'sneha@example.com', '9876543213');

INSERT INTO companies (name, job_role, package_lpa, min_cgpa, max_backlogs, eligible_branches, drive_date) VALUES
('TechNova Solutions', 'Software Engineer', 6.50, 7.00, 1, 'CSE,IT', '2026-08-10'),
('DataWorks Inc', 'Data Analyst', 5.00, 6.50, 2, 'CSE,IT,ECE', '2026-08-15');
