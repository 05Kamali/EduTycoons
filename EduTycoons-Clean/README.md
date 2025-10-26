# EduTycoons - Complete Job Portal Platform

A comprehensive full-stack job portal built with the MERN stack featuring AI-powered career guidance, placement management, and smart job matching.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd EduTycoons-Clean
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the environment template
   cp backend/env.example backend/.env
   
   # Edit backend/.env with your configuration:
   # - MONGODB_URI=mongodb://localhost:27017/EduTycoons
   # - JWT_SECRET=your-super-secret-jwt-key
   # - OPENAI_API_KEY=your-openai-api-key (optional)
   # - YOUTUBE_API_KEY=your-youtube-api-key (optional)
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   mongod
   ```

5. **Run the application**
   ```bash
   # Start both backend and frontend
   npm start
   
   # Or start them separately:
   npm run backend  # Backend on http://localhost:5000
   npm run frontend # Frontend on http://localhost:3000
   ```

6. **Access the application**
   - Main Page: Open `index.html` in your browser
   - Frontend App: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
EduTycoons-Clean/
├── index.html              # Main landing page
├── package.json            # Root package.json with scripts
├── README.md               # This file
├── backend/                # Node.js/Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication & validation
│   ├── controllers/       # Route controllers
│   ├── utils/            # Utility functions
│   ├── uploads/          # File upload directory
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── env.example       # Environment variables template
└── frontend/              # React frontend
    ├── public/           # Static files
    ├── src/              # React source code
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── context/      # React context providers
    │   ├── services/     # API service functions
    │   ├── styles/       # Global styles
    │   └── utils/        # Utility functions
    └── package.json      # Frontend dependencies
```

## 🎯 Features

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

## 🔧 Configuration

### Environment Variables (backend/.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/EduTycoons

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# External API Keys (Optional)
OPENAI_API_KEY=your-openai-api-key
YOUTUBE_API_KEY=your-youtube-api-key

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🚀 Deployment

### For GitHub Pages (Frontend Only)
1. Build the frontend: `npm run build`
2. Deploy the `frontend/build` folder to GitHub Pages

### For Full Stack Deployment
1. **Backend**: Deploy to Heroku, Railway, or similar
2. **Frontend**: Deploy to Netlify, Vercel, or similar
3. **Database**: Use MongoDB Atlas for production

### Environment Setup for Production
- Set `NODE_ENV=production`
- Use MongoDB Atlas connection string
- Set secure JWT secret
- Configure CORS for your domain

## 📚 API Documentation

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Job Routes
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (recruiters only)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs/:id/apply` - Apply for job

### AI Routes
- `POST /api/ai/chatbot` - AI chatbot conversation
- `GET /api/ai/learning-resources` - Get learning resources
- `POST /api/ai/skill-recommendations` - Get skill recommendations

## 🎯 User Roles

### Job Seeker Features
- Profile management with skills and experience
- Job search and application system
- Daily progress tracking with goals
- AI tutor for learning resources
- AI helpline chatbot for career guidance
- Job recommendations based on skills

### Recruiter Features
- Suggested job seekers based on requirements
- AI helpline chatbot
- Advanced candidate search
- Job posting and management
- Application management and status updates

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

**Built with ❤️ by the EduTycoons Team**
