# EduTycoons Deployment Configuration

## Environment Variables for Production

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/EduTycoons
JWT_SECRET=your-super-secure-production-jwt-secret
OPENAI_API_KEY=your-openai-api-key
YOUTUBE_API_KEY=your-youtube-api-key
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend Environment Variables
Create `frontend/.env`:
```env
REACT_APP_API_URL=https://your-backend-api.com
REACT_APP_ENVIRONMENT=production
```

## Deployment Platforms

### 1. Heroku (Backend)
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create edutycoons-backend`
4. Set environment variables in Heroku dashboard
5. Deploy: `git push heroku main`

### 2. Netlify (Frontend)
1. Build frontend: `npm run build`
2. Deploy `frontend/build` folder to Netlify
3. Set environment variables in Netlify dashboard

### 3. Vercel (Frontend)
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### 4. Railway (Full Stack)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## MongoDB Atlas Setup
1. Create account at mongodb.com/cloud/atlas
2. Create new cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

## GitHub Pages (Frontend Only)
1. Build: `npm run build`
2. Deploy `frontend/build` to GitHub Pages
3. Update API URLs to production backend

## Docker Deployment
```dockerfile
# Dockerfile for backend
FROM node:16-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
EXPOSE 5000
CMD ["npm", "start"]
```

## SSL/HTTPS Setup
- Use Cloudflare for SSL
- Or configure SSL certificates on your hosting platform
- Update CORS settings for HTTPS domains
