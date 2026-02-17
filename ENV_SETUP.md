# 🔧 Environment Variables Quick Reference

## 🎯 Backend (Render)

**Environment Variables to set in Render Dashboard:**

| Variable | Local Development | Production (Render) |
|----------|-------------------|---------------------|
| `PORT` | `5000` | `5000` |
| `MONGO_URI` | Your MongoDB connection string | Your MongoDB connection string |
| `JWT_SECRET` | `supersecretkey` | **Strong secret key** |
| `NODE_ENV` | `development` | `production` |
| `FRONTEND_URL` | `http://localhost:5173` | `https://care-portal-minorproject.vercel.app` |

---

## 🎨 Frontend (Vercel)

**Environment Variables to set in Vercel Dashboard:**

| Variable | Local Development | Production (Vercel) |
|----------|-------------------|---------------------|
| `VITE_API_URL` | `http://localhost:5000/api` | `https://care-portal-minorproject.onrender.com/api` |

---

## 📋 Copy-Paste for Render

```env
PORT=5000
MONGO_URI=mongodb+srv://doctor:doctor420@doctor.w3tzkib.mongodb.net/?appName=doctor
JWT_SECRET=supersecretkey
NODE_ENV=production
FRONTEND_URL=https://care-portal-minorproject.vercel.app
```

⚠️ Replace `FRONTEND_URL` with your actual Vercel URL after deployment.

---

## 📋 Copy-Paste for Vercel

```env
VITE_API_URL=https://care-portal-minorproject.onrender.com/api
```

⚠️ Replace `VITE_API_URL` with your actual Render backend URL after deployment.

---

## 🔄 Two-Way Setup

1. **Deploy Backend First** (Render)
   - Get backend URL: `https://YOUR-APP.onrender.com`
   
2. **Deploy Frontend** (Vercel)
   - Set `VITE_API_URL` to backend URL + `/api`
   - Get frontend URL: `https://YOUR-APP.vercel.app`
   
3. **Update Backend CORS** (Render)
   - Set `FRONTEND_URL` to your Vercel URL
   - Redeploy backend

---

## ✅ Verification Commands

### Check Backend Environment
```bash
# In Render dashboard > Shell
echo $FRONTEND_URL
echo $NODE_ENV
```

### Check Frontend Environment
```bash
# In your local terminal
cd frontend
npm run build
# Check console output for VITE_API_URL value
```

### Test API Connection
```bash
# Check if backend is running
curl https://YOUR-BACKEND-URL.onrender.com/api/doctors

# Should return JSON array of doctors
```

---

## 🐛 Common Mistakes

❌ **Mistake 1**: Setting `VITE_API_URL=http://localhost:5000/api` in Vercel  
✅ **Fix**: Use your Render URL: `https://YOUR-APP.onrender.com/api`

❌ **Mistake 2**: Setting `FRONTEND_URL=http://localhost:5173` in Render  
✅ **Fix**: Use your Vercel URL: `https://YOUR-APP.vercel.app`

❌ **Mistake 3**: Forgetting `/api` suffix in `VITE_API_URL`  
✅ **Fix**: Always include `/api`: `https://YOUR-APP.onrender.com/api`

❌ **Mistake 4**: Not redeploying after changing env variables  
✅ **Fix**: Redeploy app after changing environment variables

---

## 🔐 Security Checklist

- [ ] Strong `JWT_SECRET` in production (not "supersecretkey")
- [ ] Specific `FRONTEND_URL` (not `*`) in production
- [ ] `.env` files in `.gitignore`
- [ ] MongoDB password is secure
- [ ] HTTPS enabled on both Render and Vercel (automatic)
