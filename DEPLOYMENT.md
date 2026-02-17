# 🚀 Deployment Guide

## 📋 Overview
This guide covers deploying:
- **Backend** on Render
- **Frontend** on Vercel

## 🔧 Backend Deployment (Render)

### Step 1: Setup on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `care-portal-minorproject`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 2: Environment Variables on Render
Add these in **Environment** tab:

```env
PORT=5000
MONGO_URI=mongodb+srv://doctor:doctor420@doctor.w3tzkib.mongodb.net/?appName=doctor
JWT_SECRET=supersecretkey
NODE_ENV=production
FRONTEND_URL=https://care-portal-minorproject.vercel.app
```

⚠️ **Important**: Replace `FRONTEND_URL` with your actual Vercel deployment URL.

### Step 3: Deploy
Click **Create Web Service** and wait for deployment.

Your backend will be at: `https://care-portal-minorproject.onrender.com`

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Setup on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Environment Variables on Vercel
Add these in **Settings** → **Environment Variables**:

```env
VITE_API_URL=https://care-portal-minorproject.onrender.com/api
```

⚠️ **Important**: Replace with your actual Render backend URL.

### Step 3: Deploy
Click **Deploy** and wait for deployment.

Your frontend will be at: `https://care-portal-minorproject.vercel.app`

---

## ✅ Post-Deployment Checklist

### 1. Update Backend CORS
Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly.

### 2. Update Frontend API URL
Make sure `VITE_API_URL` in Vercel matches your Render backend URL + `/api`.

### 3. Test All Endpoints
- [ ] Register new user
- [ ] Login as patient
- [ ] Login as doctor
- [ ] Book appointment (patient)
- [ ] View appointments (patient)
- [ ] Accept/Reject appointments (doctor)

---

## 🐛 Common Issues & Fixes

### Issue 1: 404 on `/register` or `/login`
**Cause**: Express is not serving React routes.

**Fix**: Already implemented in `backend/index.js`:
```javascript
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});
```

This only works if you deploy frontend build inside backend. For separate deployments (Render + Vercel), this is not needed.

---

### Issue 2: CORS Error
**Cause**: Backend not allowing frontend origin.

**Fix**: Set `FRONTEND_URL` env variable in Render:
```env
FRONTEND_URL=https://care-portal-minorproject.vercel.app
```

Backend code already handles this in `index.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
};
app.use(cors(corsOptions));
```

---

### Issue 3: API Calls Fail
**Cause**: Frontend using wrong API URL.

**Fix**: Update `VITE_API_URL` in Vercel environment variables:
```env
VITE_API_URL=https://care-portal-minorproject.onrender.com/api
```

---

### Issue 4: "Listener indicated async response" Error
**Cause**: Browser extension, NOT your app.

**Fix**: Ignore it—it's harmless.

---

## 🔄 Re-deploying After Changes

### Backend Changes
1. Push to GitHub
2. Render auto-deploys (if auto-deploy enabled)
3. Or manually click **Deploy** on Render dashboard

### Frontend Changes
1. Push to GitHub
2. Vercel auto-deploys
3. Or manually trigger deployment from Vercel dashboard

---

## 📝 Local Development Setup

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://doctor:doctor420@doctor.w3tzkib.mongodb.net/?appName=doctor
JWT_SECRET=supersecretkey
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Run Locally
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  User Browser                                           │
└────────────────┬────────────────────────────────────────┘
                 │
                 v
┌─────────────────────────────────────────────────────────┐
│  Frontend (Vercel)                                      │
│  https://care-portal-minorproject.vercel.app           │
│  - React + Vite                                         │
│  - React Router (Client-side routing)                   │
│  - Axios (API calls)                                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTP Requests to /api/*
                 v
┌─────────────────────────────────────────────────────────┐
│  Backend (Render)                                       │
│  https://care-portal-minorproject.onrender.com         │
│  - Express.js                                           │
│  - MongoDB (Atlas)                                      │
│  - JWT Authentication                                   │
│  - CORS configured for Vercel origin                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 v
┌─────────────────────────────────────────────────────────┐
│  MongoDB Atlas                                          │
│  mongodb+srv://...                                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Notes

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong JWT secrets** in production
3. **Use specific CORS origins** - Don't use `*` in production
4. **Use HTTPS** - Both Render and Vercel provide this automatically

---

## 📞 Support

If deployment fails:
1. Check Render logs: **Logs** tab in Render dashboard
2. Check Vercel logs: **Deployments** → Click deployment → **Logs**
3. Check browser console: F12 → **Console** tab
4. Check network tab: F12 → **Network** tab

---

## 🎉 Success!

Once deployed:
- ✅ Backend API: `https://care-portal-minorproject.onrender.com/api`
- ✅ Frontend App: `https://care-portal-minorproject.vercel.app`
- ✅ All routes work (React Router handles client-side)
- ✅ CORS configured correctly
- ✅ Environment variables set properly
