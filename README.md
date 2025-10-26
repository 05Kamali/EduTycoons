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
- **Skill Improvement**: Personalized learning paths and skill development

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
- **Express Validator** for input validation

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **Styled Components** for styling
- **React Query** for data fetching
- **React Hook Form** for form management
- **React Hot Toast** for notifications
- **Chart.js** for data visualization

### Database Collections
- `user_info` - User profiles and authentication
- `company` - Company information
- `placement_record` - Educational placement records
- `jobs` - Job postings and requirements
- `applications` - Job applications and status

## 📁 Project Structure

```
EduTycoons/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Authentication and validation
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── uploads/             # File upload directory
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── env.example          # Environment variables template
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context providers
│   │   ├── services/        # API service functions
│   │   ├── styles/          # Global styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main App component
│   │   └── index.js         # Entry point
│   └── package.json         # Frontend dependencies
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EduTycoons
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Backend
   cd ../backend
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/EduTycoons

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# External API Keys
OPENAI_API_KEY=your-openai-api-key
YOUTUBE_API_KEY=your-youtube-api-key

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
FRONTEND_URL=http://localhost:3000
```

### API Keys Setup

1. **OpenAI API**: Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. **YouTube API**: Get your API key from [Google Cloud Console](https://console.cloud.google.com/)

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### User Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/jobseekers` - Get job seekers (recruiters only)
- `GET /api/users/suggested-candidates/:jobId` - Get suggested candidates

### Job Routes
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (recruiters only)
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:id/apply` - Apply for job
- `GET /api/jobs/recommended` - Get recommended jobs

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
- `POST /api/ai/skill-recommendations` - Get skill recommendations
- `POST /api/ai/job-matching` - Job matching analysis

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
- Advanced candidate search
- Placement records viewing with matching
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

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect to MongoDB Atlas
4. Deploy using Git

### Frontend Deployment (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the build folder to your hosting service
3. Set environment variables for API URL

### Database Deployment (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Real-time notifications
- Video interview integration
- Advanced analytics dashboard
- Mobile app development
- Multi-language support
- Advanced AI features
- Integration with more external APIs

---

**Built with ❤️ by the EduTycoons Team**
