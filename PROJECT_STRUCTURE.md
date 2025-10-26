# EduTycoons Project Structure

## 📁 Complete Directory Tree

```
EduTycoons-JobPortal/
├── index.html                    # 🏠 Landing Page (Root)
├── package.json                  # 📦 Root Package (Concurrent Scripts)
├── README.md                     # 📖 Complete Documentation
├── QUICKSTART.md                 # ⚡ Quick Start Guide
├── .gitignore                    # 🚫 Git Ignore Rules
│
├── backend/                      # 🔧 Node.js/Express Backend
│   ├── models/                   # 📊 MongoDB Models
│   │   ├── User.js              # 👤 User Authentication & Profile
│   │   ├── Company.js           # 🏢 Company Information
│   │   ├── PlacementRecord.js   # 📈 Placement Tracking
│   │   ├── Job.js               # 💼 Job Postings
│   │   └── Application.js       # 📝 Job Applications
│   │
│   ├── routes/                   # 🛣️ API Routes
│   │   ├── auth.js              # 🔐 Authentication (Register/Login)
│   │   ├── users.js             # 👥 User Management
│   │   ├── companies.js         # 🏢 Company CRUD
│   │   ├── placements.js        # 📊 Placement Management
│   │   ├── jobs.js              # 💼 Job Management
│   │   ├── applications.js     # 📝 Application Tracking
│   │   └── ai.js               # 🤖 AI Features (Chatbot, Tutor)
│   │
│   ├── middleware/               # 🛡️ Middleware
│   │   └── auth.js              # JWT Authentication Middleware
│   │
│   ├── config/                  # ⚙️ Configuration
│   │   └── database.js         # MongoDB Connection
│   │
│   ├── uploads/                 # 📁 File Uploads
│   │   └── .gitkeep
│   │
│   ├── .env.example             # 🌍 Environment Template
│   ├── server.js               # 🚀 Main Server File
│   └── package.json            # 📦 Backend Dependencies
│
├── frontend/                    # ⚛️ React.js Frontend
│   ├── src/
│   │   ├── components/         # 🧩 Reusable Components
│   │   │   ├── Layout/
│   │   │   │   └── Layout.js   # 📐 Main Layout (Sidebar, TopBar)
│   │   │   └── UI/
│   │   │       └── LoadingSpinner.js  # ⏳ Loading Indicator
│   │   │
│   │   ├── pages/              # 📄 Page Components
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js       # 🔑 Login Page
│   │   │   │   └── Register.js    # ✍️ Registration Page
│   │   │   │
│   │   │   ├── Dashboard/
│   │   │   │   ├── JobSeekerDashboard.js  # 👨‍💼 Job Seeker Dashboard
│   │   │   │   └── RecruiterDashboard.js  # 👔 Recruiter Dashboard
│   │   │   │
│   │   │   ├── Jobs/
│   │   │   │   ├── Jobs.js          # 📋 Browse All Jobs
│   │   │   │   └── JobDetails.js    # 📄 Job Detail View
│   │   │   │
│   │   │   ├── Profile/
│   │   │   │   └── Profile.js       # 👤 User Profile Management
│   │   │   │
│   │   │   ├── Placements/
│   │   │   │   └── Placements.js    # 📊 Placement Records
│   │   │   │
│   │   │   ├── Applications/
│   │   │   │   └── Applications.js # 📝 Application Tracking
│   │   │   │
│   │   │   └── AI/
│   │   │       ├── AITutor.js       # 📚 AI Learning Resources
│   │   │       └── AIChatbot.js     # 💬 AI Career Chatbot
│   │   │
│   │   ├── context/            # 🔄 React Context
│   │   │   └── AuthContext.js  # Authentication State Management
│   │   │
│   │   ├── services/           # 🌐 API Services
│   │   │   └── api.js          # Axios API Configuration
│   │   │
│   │   ├── styles/             # 🎨 Global Styles
│   │   │   └── index.css      # Base CSS Styles
│   │   │
│   │   ├── App.js              # ⚛️ Main App Component with Routing
│   │   └── index.js            # 🚀 React Entry Point
│   │
│   ├── public/
│   │   ├── index.html           # HTML Template
│   │   └── manifest.json       # PWA Manifest
│   │
│   └── package.json            # 📦 Frontend Dependencies
│
└── (README.md, QUICKSTART.md, PROJECT_STRUCTURE.md)
```

## 🗂️ File Count Summary

### Backend Files
- **Models**: 5 files (User, Company, PlacementRecord, Job, Application)
- **Routes**: 7 files (auth, users, companies, placements, jobs, applications, ai)
- **Middleware**: 1 file (auth.js)
- **Config**: 1 file (database.js)
- **Server**: 1 file (server.js)

### Frontend Files
- **Components**: 2 files (Layout, LoadingSpinner)
- **Pages**: 11 files (Auth, Dashboards, Jobs, Profile, Placements, Applications, AI)
- **Context**: 1 file (AuthContext)
- **Services**: 1 file (api.js)
- **Styles**: 1 file (index.css)
- **Core**: 2 files (App.js, index.js)

### Configuration Files
- Root: index.html, package.json, README.md, QUICKSTART.md, .gitignore
- Backend: package.json, .env.example
- Frontend: package.json, public/index.html, public/manifest.json

**Total: 35+ files created**

## 🎯 Key Features by Directory

### Backend (7 routes)
1. **Authentication** - Register, Login, JWT
2. **Users** - Profile management, goals tracking
3. **Companies** - Company CRUD operations
4. **Placements** - Placement record management
5. **Jobs** - Job posting and management
6. **Applications** - Application tracking
7. **AI** - Chatbot and learning resources

### Frontend (11 pages)
1. **Auth** - Login & Register pages
2. **Dashboards** - Role-specific dashboards
3. **Jobs** - Job browsing and details
4. **Profile** - User profile management
5. **Placements** - Placement records view
6. **Applications** - Application tracking
7. **AI** - AI Tutor and Chatbot

## 🚀 Quick Access

- **Landing Page**: Open `index.html` in browser
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Run Command**: `npm run dev`

## 📝 Scripts Available

```json
{
  "dev": "Run both backend and frontend concurrently",
  "server": "Run only backend server",
  "client": "Run only frontend client",
  "start": "Production start",
  "build": "Build frontend for production",
  "install-all": "Install all dependencies"
}
```

## 🎨 Tech Stack Overview

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router, Styled Components |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **AI** | OpenAI API |
| **API Integration** | GitHub, YouTube, Stack Overflow |
| **Styling** | Styled Components, CSS |
| **Notifications** | React Hot Toast |
| **State Management** | React Context API |
| **Data Fetching** | React Query, Axios |

## 🔐 Collections (MongoDB)

1. **user_info** - Users (Job Seekers & Recruiters)
2. **company** - Company information
3. **placement_record** - Placement records
4. **jobs** - Job postings
5. **applications** - Job applications

## ✨ AI Features

1. **AI Tutor** - Learning resource aggregation
2. **AI Chatbot** - Career guidance (OpenAI)
3. **Job Matching** - Smart recommendation algorithm
4. **Candidate Suggestions** - AI-powered recruiter tools

---

**Created by: EduTycoons Team**  
**Version: 1.0.0**  
**License: MIT**

