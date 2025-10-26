# EduTycoons - Complete Job Portal Platform

A comprehensive full-stack job portal built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring AI-powered career guidance, placement management, and smart job matching.

## 🚀 Features

### Core Features
- **Dual User System**: Job Seekers and Recruiters with role-based access
- **JWT Authentication**: Secure login/signup with token-based authentication
- **Job Management**: Complete CRUD operations for job postings
- **Application System**: Job application tracking and management
- **Placement Records**: Educational placement tracking and management
- **Profile Management**: Comprehensive user profiles with skills and experience

### AI-Powered Features
- **AI Tutor**: Learning resource recommendations from external APIs
- **AI Chatbot**: Career guidance and consultation using OpenAI
- **Smart Job Matching**: Algorithm-based job recommendations
- **Candidate Suggestions**: AI-powered candidate recommendations for recruiters

### External API Integrations
- **YouTube API**: Learning video recommendations
- **GitHub API**: Coding resource suggestions
- **Stack Overflow API**: Q&A resource integration
- **OpenAI API**: AI chatbot functionality

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Axios** for external API calls
- **Multer** for file uploads

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Styled Components** for styling
- **React Query** for data fetching
- **React Hot Toast** for notifications
- **Chart.js** for data visualization

### Database
- **MongoDB** - Database name: `EduTycoons`
- Collections: `user_info`, `company`, `placement_record`, `jobs`, `applications`

## 📁 Project Structure

```
EduTycoons-JobPortal/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB models
│   │   ├── User.js
│   │   ├── Company.js
│   │   ├── PlacementRecord.js
│   │   ├── Job.js
│   │   └── Application.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── companies.js
│   │   ├── placements.js
│   │   ├── jobs.js
│   │   ├── applications.js
│   │   └── ai.js
│   ├── middleware/         # Auth & other middleware
│   │   └── auth.js
│   ├── uploads/            # File uploads
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/               # React.js frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Layout/
│   │   │   │   └── Layout.js
│   │   │   └── UI/
│   │   │       └── LoadingSpinner.js
│   │   ├── pages/         # Page components
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Dashboard/
│   │   │   │   ├── JobSeekerDashboard.js
│   │   │   │   └── RecruiterDashboard.js
│   │   │   ├── Jobs/
│   │   │   │   ├── Jobs.js
│   │   │   │   └── JobDetails.js
│   │   │   ├── Profile/
│   │   │   │   └── Profile.js
│   │   │   ├── Placements/
│   │   │   │   └── Placements.js
│   │   │   ├── Applications/
│   │   │   │   └── Applications.js
│   │   │   └── AI/
│   │   │       ├── AITutor.js
│   │   │       └── AIChatbot.js
│   │   ├── context/       # React context
│   │   │   └── AuthContext.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── styles/        # Global styles
│   │   │   └── index.css
│   │   ├── App.js         # Main App component
│   │   └── index.js
│   ├── public/
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository** (or extract the project files)

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   
   This will install dependencies for root, backend, and frontend.

3. **Set up environment variables**

   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit the `.env` file with your configurations:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/EduTycoons
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   OPENAI_API_KEY=your-openai-api-key-here
   YOUTUBE_API_KEY=your-youtube-api-key-here
   ```

4. **Set up MongoDB**
   
   Make sure MongoDB is running locally, or update `MONGODB_URI` in `.env` to use MongoDB Atlas or another MongoDB instance.

### Running the Application

#### Development Mode (Recommended)

Run both backend and frontend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

#### Run Separately

Backend only:
```bash
npm run server
```

Frontend only:
```bash
npm run client
```

### Production Build

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Set `NODE_ENV=production` in backend `.env`

3. Start the server:
   ```bash
   npm start
   ```

The application will be served from the backend at `http://localhost:5000`

## 📝 Usage

### For Job Seekers
1. Register with role "Job Seeker"
2. Complete your profile with skills and experience
3. Browse and apply to jobs
4. Use AI Tutor for learning resources
5. Get career guidance from AI Helpline
6. Track daily goals and progress

### For Recruiters
1. Register with role "Recruiter"
2. Post job openings
3. View and manage applications
4. Search for candidates
5. View placement records
6. Get recruitment tips from AI Helpline

## 🔐 Authentication

The application uses JWT-based authentication. Tokens are stored in localStorage and automatically included in API requests.

### Default Test Accounts
You can register new accounts through the UI, or use these test data:

**Job Seeker:**
- Email: jobseeker@example.com
- Password: password123
- Role: jobseeker

**Recruiter:**
- Email: recruiter@example.com  
- Password: password123
- Role: recruiter

## 📡 API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update` - Update profile

### User Routes
- `GET /api/users/profile` - Get user profile
- `GET /api/users/jobseekers` - Get all job seekers
- `PUT /api/users/profile` - Update profile
- `POST /api/users/goals` - Add daily goals

### Job Routes
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/recommended` - Get recommended jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/apply` - Apply for job

### Application Routes
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/received` - Get received applications (recruiters)
- `PUT /api/applications/:id/status` - Update application status

### Placement Routes
- `GET /api/placements` - Get all placements
- `POST /api/placements` - Create placement record
- `PUT /api/placements/:id` - Update placement record
- `DELETE /api/placements/:id` - Delete placement record

### AI Routes
- `POST /api/ai/chatbot` - AI chatbot conversation
- `GET /api/ai/learning-resources` - Get learning resources

## 🎯 User Roles & Features

### Job Seeker Features
- Profile management with skills and experience
- Job search and application system
- Daily progress tracking with goals
- AI tutor for learning resources
- AI helpline chatbot for career guidance
- Skill improvement strategy recommendations
- Job recommendations based on skills
- Application status tracking

### Recruiter Features
- Suggested job seekers based on requirements
- AI helpline chatbot
- Advanced search to find candidates
- View placement records with matching
- Job posting and management
- Application management and status updates
- Candidate profile viewing

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Role-based access control
- Secure file upload handling

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Create a Heroku app
2. Set environment variables in dashboard
3. Connect to MongoDB Atlas
4. Deploy using Git

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `build` folder
3. Set up environment variables for API URL

### MongoDB Atlas Setup
1. Create a free cluster on MongoDB Atlas
2. Get connection string
3. Replace `MONGODB_URI` in `.env`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👥 Authors

EduTycoons Team

---

**Note**: Make sure to set up your environment variables before running the application. For AI features to work fully, you'll need to add API keys for OpenAI and YouTube (optional).

