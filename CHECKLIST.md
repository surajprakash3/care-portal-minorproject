# ✅ Pre-Deployment Checklist

## 🎯 Before You Deploy

### 1. Code Changes ✅ DONE
- [x] Environment-based API URLs configured
- [x] CORS configured for production
- [x] SPA fallback route added to Express
- [x] React Router configured properly
- [x] All API calls use centralized axios client

### 2. Files to Verify

#### Backend Files ✅
- [x] `backend/index.js` - CORS + SPA fallback
- [x] `backend/.env.example` - Template created
- [x] `backend/.gitignore` - .env excluded

#### Frontend Files ✅
- [x] `frontend/src/api/client.js` - Uses VITE_API_URL
- [x] `frontend/.env.example` - Template created
- [x] `frontend/.gitignore` - .env excluded

#### Documentation Files ✅
- [x] `DEPLOYMENT.md` - Full deployment guide
- [x] `ENV_SETUP.md` - Environment variables reference
- [x] `README.md` - Complete project documentation

---

## 🚀 Deployment Steps

### Phase 1: Deploy Backend to Render

1. **Create Web Service on Render**
   - Go to: https://dashboard.render.com/
   - Click: **New +** → **Web Service**
   - Connect: GitHub repository
   
2. **Configure Build Settings**
   ```
   Name: care-portal-minorproject
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Set Environment Variables**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://doctor:doctor420@doctor.w3tzkib.mongodb.net/?appName=doctor
   JWT_SECRET=supersecretkey
   NODE_ENV=production
   FRONTEND_URL=*
   ```
   
   ⚠️ We'll update `FRONTEND_URL` after deploying frontend.

4. **Deploy & Copy Backend URL**
   - Click **Create Web Service**
   - Wait for deployment
   - Copy URL: `https://YOUR-APP.onrender.com`

---

### Phase 2: Deploy Frontend to Vercel

1. **Create New Project on Vercel**
   - Go to: https://vercel.com/dashboard
   - Click: **New Project**
   - Import: GitHub repository
   
2. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Set Environment Variables**
   ```env
   VITE_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
   ```
   
   ⚠️ Replace `YOUR-BACKEND-URL` with actual Render URL from Phase 1.

4. **Deploy & Copy Frontend URL**
   - Click **Deploy**
   - Wait for deployment
   - Copy URL: `https://YOUR-APP.vercel.app`

---

### Phase 3: Update Backend CORS

1. **Go back to Render dashboard**
   - Navigate to your web service
   - Click **Environment** tab

2. **Update Environment Variable**
   ```env
   FRONTEND_URL=https://YOUR-APP.vercel.app
   ```
   
   ⚠️ Replace with actual Vercel URL from Phase 2.

3. **Redeploy Backend**
   - Render will auto-redeploy when you save environment variables
   - Or manually trigger: **Manual Deploy** → **Deploy latest commit**

---

## 🧪 Testing After Deployment

### Test Backend API
```bash
# Health check (should return 404 or API not found, which is fine)
curl https://YOUR-BACKEND-URL.onrender.com/

# Test doctors endpoint (should return JSON array)
curl https://YOUR-BACKEND-URL.onrender.com/api/doctors
```

### Test Frontend
1. Open: `https://YOUR-APP.vercel.app`
2. Should see Login page
3. Navigate to `/register` - should work
4. Check browser console (F12) - no errors

### Test Full Flow
1. **Register Patient**
   - Go to `/register`
   - Fill form, select "Patient"
   - Click Register
   - Should redirect to login

2. **Login Patient**
   - Enter credentials
   - Click Login
   - Should redirect to `/patient` dashboard

3. **Book Appointment**
   - Select department
   - Select doctor
   - Choose date/time
   - Click Book
   - Should appear in "My Appointments"

4. **Register Doctor**
   - Logout
   - Register with role "Doctor"
   - Select department

5. **Login Doctor**
   - Login with doctor credentials
   - Should see appointment requests
   - Try accepting/rejecting

6. **Verify Patient Update**
   - Logout
   - Login as patient again
   - Check appointment status updated

---

## 🐛 Common Deployment Issues

### Issue 1: CORS Error in Browser Console
```
Access to XMLHttpRequest at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Fix:**
- Check `FRONTEND_URL` in Render matches Vercel URL exactly
- No trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`
- Redeploy backend after changing

---

### Issue 2: API Calls Return 404
```
GET https://your-app.vercel.app/api/login 404
```

**Fix:**
- Check `VITE_API_URL` in Vercel points to Render backend
- Should be: `https://your-backend.onrender.com/api` (with `/api`)
- Redeploy frontend after changing

---

### Issue 3: Blank Page on Vercel
**Fix:**
- Check Vercel build logs for errors
- Make sure `npm run build` works locally
- Check environment variables are set

---

### Issue 4: Backend Crashes on Render
**Fix:**
- Check Render logs
- Common causes:
  - Missing environment variables
  - MongoDB connection failed
  - Port binding issue (Render assigns port automatically)
- Make sure `process.env.PORT` is used (already done ✅)

---

## 🎉 Success Criteria

- [ ] Backend API responds at `https://....onrender.com/api/doctors`
- [ ] Frontend loads at `https://....vercel.app`
- [ ] Login page is visible
- [ ] No CORS errors in browser console
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Patient can book appointments
- [ ] Doctor can accept/reject appointments
- [ ] Appointment status updates reflect for patients

---

## 📞 Need Help?

### Check Logs

**Render Logs:**
1. Go to Render dashboard
2. Select your web service
3. Click **Logs** tab
4. Look for errors

**Vercel Logs:**
1. Go to Vercel dashboard
2. Select your project
3. Click **Deployments**
4. Click on latest deployment
5. Click **Logs** or **Functions**

**Browser Logs:**
1. Open app in browser
2. Press F12
3. Check **Console** tab for errors
4. Check **Network** tab for failed requests

### Common Error Messages

| Error | Likely Cause | Fix |
|-------|-------------|-----|
| `MongoServerError: Authentication failed` | Wrong MongoDB credentials | Check MONGO_URI |
| `Error: listen EADDRINUSE` | Port already in use | Render assigns port automatically (fixed ✅) |
| `Cannot read properties of undefined` | Environment variable not set | Check all env vars are set |
| `Network Error` | Backend not reachable | Check backend URL is correct |
| `401 Unauthorized` | JWT token issue | Clear localStorage, login again |

---

## 🔄 Post-Deployment Updates

### Update Backend Code
1. Make changes in `backend/` folder
2. Commit and push to GitHub
3. Render auto-deploys (if enabled)
4. Or manually deploy from Render dashboard

### Update Frontend Code
1. Make changes in `frontend/` folder
2. Commit and push to GitHub
3. Vercel auto-deploys
4. Check deployment status in Vercel dashboard

### Update Environment Variables
- **Render**: Dashboard → Environment → Save (auto-redeploys)
- **Vercel**: Dashboard → Settings → Environment Variables → Save → Redeploy

---

## 🎯 Current Status

| Component | Status | URL |
|-----------|--------|-----|
| Backend | ⚠️ Ready to deploy | `https://care-portal-minorproject.onrender.com` |
| Frontend | ⚠️ Ready to deploy | `https://care-portal-minorproject.vercel.app` |
| MongoDB | ✅ Connected | Atlas |
| CORS | ✅ Configured | Dynamic |
| Authentication | ✅ Working | JWT |
| API Routes | ✅ Working | All endpoints |

---

## 📝 Next Steps

1. ✅ Read this checklist
2. 🔨 Deploy backend to Render (Phase 1)
3. 🔨 Deploy frontend to Vercel (Phase 2)
4. 🔨 Update CORS on backend (Phase 3)
5. ✅ Test full flow
6. 🎉 Celebrate!

---

**Good Luck! 🚀**
