# Smart Placement Management System

A simple full-stack placement management application.

- **Backend:** Java (Spring Boot) + MySQL
- **Frontend:** React (Create React App), responsive plain CSS

## Features

- Manage student records (name, roll no, branch, CGPA, backlogs, contact)
- Manage company/placement drive records (role, package, minimum CGPA, max backlogs, eligible branches, drive date)
- **Eligibility engine:** for any selected company, instantly lists which students qualify, based on:
  - Student CGPA >= company's minimum CGPA
  - Student backlogs <= company's maximum allowed backlogs
  - Student branch is in the company's list of eligible branches
- Register eligible students for a drive with one click
- Track every application's status (APPLIED / SELECTED / REJECTED)

## Folder Structure

```
placement-management-system/
├── database/
│   └── schema.sql            -> MySQL schema + sample data
├── backend/                  -> Spring Boot project (Maven)
│   ├── pom.xml
│   └── src/main/java/com/placement/...
└── frontend/                 -> React app (Create React App)
    ├── package.json
    └── src/...
```

## 1. Database Setup

1. Make sure MySQL Server is installed and running.
2. Run the schema file to create the database, tables, and a bit of sample data:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `placement_db` database with `students`, `companies`, and `placements` tables.

## 2. Backend Setup (Spring Boot)

1. Open `backend/src/main/resources/application.properties` and update the MySQL
   username/password to match your local setup:

```
spring.datasource.username=root
spring.datasource.password=root
```

2. From the `backend` folder, run:

```bash
mvn spring-boot:run
```

The API will start at `http://localhost:8080`. It uses `spring.jpa.hibernate.ddl-auto=update`,
so it will also auto-sync the schema if you make model changes.

### API Endpoints

| Method | Endpoint                                | Description                          |
|--------|------------------------------------------|---------------------------------------|
| GET    | /api/students                           | List all students                     |
| POST   | /api/students                           | Add a student                         |
| PUT    | /api/students/{id}                      | Update a student                      |
| DELETE | /api/students/{id}                      | Delete a student                      |
| GET    | /api/companies                          | List all companies                    |
| POST   | /api/companies                          | Add a company / drive                 |
| PUT    | /api/companies/{id}                     | Update a company                      |
| DELETE | /api/companies/{id}                     | Delete a company                      |
| GET    | /api/companies/{id}/eligible-students   | Get students eligible for that drive  |
| GET    | /api/placements                         | List all applications                 |
| POST   | /api/placements/apply                   | Register a student for a company      |
| PUT    | /api/placements/{id}/status             | Update application status             |
| DELETE | /api/placements/{id}                    | Delete an application record          |

## 3. Frontend Setup (React)

From the `frontend` folder:

```bash
npm install
npm start
```

The app will open at `http://localhost:3000` and talk to the backend at `http://localhost:8080`.

## Usage Flow

1. Add students under the **Students** tab.
2. Add companies/drives under the **Companies** tab, including the minimum CGPA, max backlogs,
   and eligible branches (comma-separated, e.g. `CSE,IT,ECE`).
3. Go to **Eligibility**, pick a company, and instantly see which students qualify. Click
   "Register for Drive" to record an application.
4. Go to **Applications** to track and update each student's status (APPLIED / SELECTED / REJECTED).

## Notes

- This is intentionally a small, simple project: no authentication, no microservices,
  just Java + MySQL + React talking over a REST API.
- CORS is pre-configured on the backend to allow requests from `http://localhost:3000`.
