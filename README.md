# 🚀 Smart Placement Management System

A simple **Full-Stack Placement Management System** built using **React, Spring Boot, and MySQL**. The application helps manage students, companies, placement drives, eligibility verification, and student applications through a clean and user-friendly interface.

---

## ✨ Features

### 👨‍🎓 Student Management
- Add new students
- Update student details
- Delete student records
- View all students

### 🏢 Company Management
- Add placement drives
- Update company information
- Delete company records
- View all companies

### ✅ Eligibility Checker
Automatically determines eligible students based on:
- Minimum CGPA requirement
- Maximum allowed backlogs
- Eligible branches

### 📝 Placement Applications
- Register eligible students for placement drives
- Track application status:
  - 🟡 Applied
  - 🟢 Selected
  - 🔴 Rejected

---

# 🛠️ Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js |
| Backend | Java, Spring Boot |
| Database | MySQL |
| ORM | Spring Data JPA (Hibernate) |
| API | RESTful APIs |
| Build Tool | Maven |

---

# 📂 Project Structure

```text
placement-management-system/
│
├── database/
│   └── schema.sql
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           └── resources/
│
└── frontend/
    ├── package.json
    └── src/
```

---

# 🗄️ Database Setup

### 1. Install MySQL

Ensure MySQL Server is installed and running.

### 2. Create the Database

Run the following command:

```bash
mysql -u root -p < database/schema.sql
```

This creates the **placement_db** database along with the required tables and sample data.

---

# ⚙️ Backend Setup

### Step 1

Navigate to the backend folder.

```bash
cd backend
```

### Step 2

Update the database credentials in:

```properties
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_db
spring.datasource.username=root
spring.datasource.password=root
```

### Step 3

Run the Spring Boot application.

```bash
mvn spring-boot:run
```

The backend will start at:

```
http://localhost:8080
```

---

# 💻 Frontend Setup

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React application.

```bash
npm start
```

The frontend runs at:

```
http://localhost:3000
```

---

# 🔗 REST API Endpoints

## Student APIs

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Add a student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

---

## Company APIs

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/companies` | Get all companies |
| POST | `/api/companies` | Add company |
| PUT | `/api/companies/{id}` | Update company |
| DELETE | `/api/companies/{id}` | Delete company |
| GET | `/api/companies/{id}/eligible-students` | Get eligible students |

---

## Placement APIs

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/placements` | Get all applications |
| POST | `/api/placements/apply` | Register student |
| PUT | `/api/placements/{id}/status` | Update status |
| DELETE | `/api/placements/{id}` | Delete application |

---

# 📋 Application Workflow

### Step 1
Add student records.

⬇️

### Step 2
Add placement companies and drives.

⬇️

### Step 3
Configure eligibility criteria:
- Minimum CGPA
- Maximum Backlogs
- Eligible Branches

⬇️

### Step 4
Check eligible students automatically.

⬇️

### Step 5
Register eligible students for the drive.

⬇️

### Step 6
Update application status.

---

# 📸 Modules

- Dashboard
- Student Management
- Company Management
- Eligibility Checker
- Placement Applications

---

# 🎯 Eligibility Logic

A student is eligible only if:

- ✔️ Student CGPA is greater than or equal to the company's minimum CGPA
- ✔️ Student backlogs are less than or equal to the company's maximum allowed backlogs
- ✔️ Student's branch matches one of the eligible branches

---

# 🚀 Future Enhancements

- Admin Authentication
- Student Login
- Company Login
- Resume Upload
- Email Notifications
- Dashboard Analytics
- Search & Filter
- Export Reports (PDF/Excel)
- Interview Scheduling

---

# 🧪 Sample Technologies Used

- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL
- React.js
- HTML5
- CSS3
- JavaScript
- Maven
- REST APIs

---

# 🤝 Contributing

Contributions, suggestions, and improvements are always welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is developed for **learning and educational purposes**.

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!
