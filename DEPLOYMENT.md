# Deployment Guide

This guide covers deploying the Job Search application to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub repository with your code
- Vercel account (free tier available)
- Render account (free tier available)
- MongoDB Atlas account (free tier available)
- RapidAPI account with JSearch API access

## Backend Deployment (Render)

### Option 1: Using Render Dashboard

1. **Create a new Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure the service**
   - **Name**: `job-search-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobsearch?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://job-search-backend.onrender.com`)

### Option 2: Using render.yaml (Infrastructure as Code)

1. **Update render.yaml**
   - Edit `backend/render.yaml`
   - Replace `https://your-frontend-domain.vercel.app` with your actual frontend URL

2. **Deploy via Blueprint**
   - In Render Dashboard, click "New" → "Blueprint"
   - Connect your repository
   - Select the `backend/render.yaml` file
   - Review and deploy

## Frontend Deployment (Vercel)

### Using Vercel Dashboard

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `.` (leave empty for root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install`

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://job-search-app.vercel.app`)

5. **Update Backend CORS**
   - Go back to Render dashboard
   - Update the `CORS_ORIGIN` environment variable with your Vercel URL
   - Redeploy the backend service

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new project
   - Build a database (choose free M0 tier)
   - Select a cloud provider and region

2. **Configure Access**
   - Create a database user with read/write permissions
   - Add IP addresses to whitelist (0.0.0.0/0 for all IPs, or specific IPs)

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## API Setup (RapidAPI)

1. **Subscribe to JSearch API**
   - Visit [JSearch API on RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
   - Subscribe to the free plan (200 requests/month)

2. **Get API Key**
   - Go to your RapidAPI dashboard
   - Find the JSearch API
   - Copy your API key from the request headers

## Post-Deployment Checklist

### Backend Verification
- [ ] Backend service is running: `https://your-backend-url.onrender.com/api/health`
- [ ] Database connection is working
- [ ] Environment variables are set correctly
- [ ] CORS is configured for your frontend domain

### Frontend Verification
- [ ] Frontend is accessible at your Vercel URL
- [ ] API key is working (try searching for jobs)
- [ ] All pages load correctly (jobs, liked, profile)
- [ ] Navigation works between pages
- [ ] Profile creation and localStorage work

### Integration Testing
- [ ] Job search returns results
- [ ] Job details pages load
- [ ] Like/unlike functionality works
- [ ] Profile creation and recommendations work
- [ ] No console errors in browser

## Monitoring and Maintenance

### Render (Backend)
- Monitor service logs in Render dashboard
- Set up alerts for service downtime
- Monitor resource usage (free tier has limits)

### Vercel (Frontend)
- Monitor deployment logs
- Check analytics for usage patterns
- Monitor Core Web Vitals

### MongoDB Atlas
- Monitor database performance
- Set up alerts for connection issues
- Keep track of storage usage

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGIN` in backend matches your frontend URL exactly
   - Check for trailing slashes in URLs

2. **API Key Issues**
   - Verify RapidAPI key is correct and active
   - Check API usage limits haven't been exceeded

3. **Database Connection Issues**
   - Verify MongoDB connection string is correct
   - Check IP whitelist includes your server's IP
   - Ensure database user has proper permissions

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are listed in package.json
   - Check for TypeScript errors

5. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify sensitive values are not exposed in client-side code

### Logs and Debugging

- **Render**: Check service logs in dashboard
- **Vercel**: Check function logs and build logs
- **Browser**: Use developer tools to check network requests and console errors

## Scaling Considerations

### Free Tier Limitations
- **Render**: Service sleeps after 15 minutes of inactivity
- **Vercel**: 100GB bandwidth per month
- **MongoDB Atlas**: 512MB storage
- **RapidAPI**: 200 requests per month

### Upgrade Paths
- **Render**: Paid plans for always-on services
- **Vercel**: Pro plan for higher limits
- **MongoDB Atlas**: Paid clusters for more storage
- **RapidAPI**: Paid plans for higher request limits

## Security Best Practices

1. **Environment Variables**
   - Never commit sensitive data to version control
   - Use strong, unique JWT secrets
   - Rotate API keys regularly

2. **Database Security**
   - Use strong database passwords
   - Limit IP access where possible
   - Enable MongoDB Atlas security features

3. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS everywhere

4. **Frontend Security**
   - Keep dependencies updated
   - Use Content Security Policy headers
   - Sanitize user inputs
