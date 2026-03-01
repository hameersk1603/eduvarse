# 🎓 EduVerse — Full Stack Learning Management System

A premium, full-stack Learning Management System built with **Spring Boot**, **React**, and **MySQL**. Features a beautiful Deep Purple & Gold royal theme with smooth animations, 3 role-based dashboards, course management, assignment tracking, and AI-ready architecture.

---

## 🛠️ Tech Stack

### Backend
- Java 21, Spring Boot 3.5, Spring Data JPA, Spring Security, MySQL 8, Maven

### Frontend
- React 18, React Router DOM, Framer Motion, Axios, Deep Purple & Gold theme

---

## ✨ Features

### 👑 Admin
- View all students, teachers and courses
- Platform statistics dashboard

### 👨‍🏫 Teacher
- Create and manage courses
- Post assignments with due dates
- Grade student submissions with feedback

### 🎒 Student
- Browse and enroll in courses
- Submit assignments
- Track grades and feedback

---

## 🚀 Getting Started

### Backend Setup

**Step 1 — Clone the repository**
```bash
git clone https://github.com/hameersk1603/eduvarse.git
cd eduvarse/backend
```

**Step 2 — Create MySQL database**
```sql
CREATE DATABASE lms_db;
```

**Step 3 — Update application.properties**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lms_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

**Step 4 — Run backend**
```bash
./mvnw spring-boot:run
```
Backend runs on **http://localhost:8080**

---

### Frontend Setup

**Step 1 — Go to frontend**
```bash
cd eduvarse/frontend
```

**Step 2 — Install dependencies**
```bash
npm install
```

**Step 3 — Start the app**
```bash
npm start
```
Frontend runs on **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users/register | Register user |
| POST | /api/users/login | Login user |
| GET | /api/users/role/{role} | Get users by role |
| POST | /api/courses/create/{teacherId} | Create course |
| GET | /api/courses/all | Get all courses |
| POST | /api/enrollments/enroll | Enroll in course |
| GET | /api/enrollments/student/{id} | Get enrollments |
| POST | /api/assignments/create/{courseId} | Create assignment |
| POST | /api/submissions/submit | Submit assignment |
| PUT | /api/submissions/grade/{id} | Grade submission |
| POST | /api/announcements/create/{courseId}/{userId} | Create announcement |

---

## 🗄️ Database Tables

- **users** — Admin, Teacher, Student accounts
- **courses** — Course details with teacher reference
- **enrollments** — Student course enrollments
- **assignments** — Course assignments
- **submissions** — Student submissions with grades
- **announcements** — Course announcements

---

## 🎨 Theme

- Primary: Deep Purple `#7c3aed`
- Accent: Gold `#f59e0b`
- Background: Dark `#0a0612`
- Fonts: Playfair Display + Inter

---

## 📅 Project Roadmap

| # | Project | Status |
|---|---------|--------|
| 1 | Expense Tracker | ✅ Done |
| 2 | HireHub Job Portal | ✅ Done |
| 3 | EduVerse LMS | ✅ Done |
| 4 | AI Legal Assistant | 🔄 Next |
| 5 | AI Finance Advisor | 🔄 Pending |
| 6 | SocialConnect Clone | 🔄 Pending |

---

## 👨‍💻 Author

**Hameer Shaik** — [@hameersk1603](https://github.com/hameersk1603)
