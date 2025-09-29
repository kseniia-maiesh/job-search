# Job Search Application

A comprehensive job search platform built with Next.js 15, TypeScript, and Express.js with MongoDB authentication.

## Features

### Frontend (Next.js)
- 🔍 **Job Search**: Search jobs using the JSearch API from RapidAPI
- 📋 **Job Cards**: Display job listings with company logos, salary, location, and more
- 📄 **Job Details**: Detailed job information with apply links
- ❤️ **Like System**: Save favorite jobs to localStorage
- 👤 **User Profiles**: Create and manage user profiles with job preferences
- 🎯 **Personalized Recommendations**: Get job suggestions based on profile
- 📱 **Responsive Design**: Mobile-friendly interface with Tailwind CSS

### Backend (Express.js)
- 🔐 **Authentication**: JWT-based user registration and login
- 🗄️ **MongoDB Integration**: User data storage with Mongoose
- 🛡️ **Security**: Password hashing with bcrypt
- 🌐 **CORS Support**: Cross-origin resource sharing
- 📊 **API Endpoints**: RESTful API for user management

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Formik + Yup** for form handling and validation
- **Axios + SWR** for API calls and caching
- **React Hooks** for state management

### Backend
- **Express.js** web framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **TypeScript** for type safety

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- RapidAPI account for JSearch API

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your RapidAPI key:
   ```
   NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobsearch?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The backend API will be available at `http://localhost:5000`

### API Setup

1. **Get RapidAPI Key**
   - Visit [JSearch API on RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
   - Subscribe to the free plan (200 requests/month)
   - Copy your API key

2. **Set up MongoDB**
   - Create a free account at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a new cluster
   - Get your connection string
   - Add your IP address to the whitelist

## Project Structure

```
job-search/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── job-details/[id]/   # Dynamic job details page
│   │   ├── liked/              # Liked jobs page
│   │   ├── create-profile/     # Profile creation page
│   │   └── page.tsx            # Home page with job search
│   ├── components/             # Reusable React components
│   │   ├── JobCard.tsx         # Job listing card
│   │   └── Navigation.tsx      # Navigation bar
│   ├── services/               # API services
│   │   └── jobApi.ts           # JSearch API integration
│   ├── types/                  # TypeScript type definitions
│   │   └── job.ts              # Job and user interfaces
│   └── utils/                  # Utility functions
│       └── localStorage.ts     # LocalStorage helpers
├── backend/
│   └── src/
│       ├── models/             # MongoDB models
│       │   └── User.ts         # User model
│       ├── routes/             # API routes
│       │   └── auth.ts         # Authentication routes
│       ├── middleware/         # Express middleware
│       │   └── auth.ts         # JWT authentication
│       └── server.ts           # Express server setup
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### Health Check
- `GET /api/health` - Server health status

## Features in Detail

### Job Search
- Search jobs by title/keywords
- Display results in responsive card layout
- Show company logos, salary ranges, locations
- Filter by remote work options
- Pagination support

### Job Details
- Comprehensive job information
- Company details and branding
- Apply directly through external links
- Save/unsave jobs functionality
- Skills and requirements display

### User Profiles
- Create personalized profiles
- Set desired job titles for recommendations
- Store preferences in localStorage
- Form validation with Formik and Yup

### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Add environment variables in Render dashboard

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobsearch
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
