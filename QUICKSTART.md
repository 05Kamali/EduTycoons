# Quick Start Guide - EduTycoons

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

### Step 2: Set Up MongoDB
Make sure MongoDB is running on your system, or use MongoDB Atlas.

For local MongoDB:
```bash
mongod
```

### Step 3: Configure Environment
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/EduTycoons
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
```

### Step 4: Run the Application
```bash
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Step 5: Access the Application
1. Open browser: http://localhost:3000
2. Click "Launch Application"
3. Register a new account
4. Start using!

## 📝 Test Accounts

After running the application, you can create test accounts:

**Job Seeker:**
- Register with role "Job Seeker"
- Email: test@jobseeker.com
- Password: test123

**Recruiter:**
- Register with role "Recruiter"
- Email: test@recruiter.com
- Password: test123

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in backend/.env

### Port Already in Use
- Kill process on port 5000: `npx kill-port 5000`
- Kill process on port 3000: `npx kill-port 3000`

### Dependencies Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Frontend Won't Start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📱 Features to Try

### As Job Seeker:
1. Complete your profile
2. Browse jobs
3. Apply for positions
4. Use AI Tutor to learn new skills
5. Chat with AI Career Helpline
6. Track your progress

### As Recruiter:
1. Post a job
2. View applications
3. Manage candidates
4. Use AI Helpline for recruitment tips
5. View placement records

## 🎯 Next Steps

1. Add your OpenAI API key for AI features
2. Add YouTube API key for video recommendations (optional)
3. Customize the design and colors
4. Add more features as needed

Happy coding! 🚀

