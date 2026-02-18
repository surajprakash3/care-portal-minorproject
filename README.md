"# 🏥 Care Portal - Minor Project

A full-stack healthcare appointment management system built with MERN stack.

## 🚀 Features

- **Patient Portal**: Book appointments, view appointment status
- **Doctor Portal**: Accept/reject appointment requests
- **Authentication**: JWT-based secure login/register
- **Role-based Access**: Separate dashboards for patients and doctors
- **Real-time Updates**: Appointment status changes reflect instantly

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router 7
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git


## 🌐 Deployment

### Production URLs
- Backend (Render): `https://care-portal-minorproject.onrender.com`
- Frontend (Vercel): `https://care-portal-minorproject.vercel.app`

## 📖 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Appointments
- `GET /api/doctors` - Get all doctors (public)
- `POST /api/appointment` - Create appointment (patient only)
- `GET /api/my-appointments` - Get patient's appointments (patient only)
- `GET /api/doctor-appointments` - Get doctor's appointments (doctor only)
- `PUT /api/appointment/:id` - Update appointment status (doctor only)

#



## 🎯 Usage

### Register as Patient
1. Go to `/register`
2. Fill in details and select "Patient"
3. Click Register

### Register as Doctor
1. Go to `/register`
2. Fill in details and select "Doctor"
3. Choose department
4. Click Register

### Patient Flow
1. Login as patient
2. Select department and doctor
3. Choose date and time
4. Book appointment
5. View appointment status in "My Appointments"

### Doctor Flow
1. Login as doctor
2. View pending appointment requests
3. Accept or reject appointments
4. Patients will see updated status

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in frontend `.env`
- Make sure backend is running on port 5000
- Check CORS settings in `backend/index.js`

### JWT token errors
- Check `JWT_SECRET` is set in backend `.env`
- Clear browser localStorage and login again

### MongoDB connection failed
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
- Ensure database user has read/write permissions

### 404 on deployed routes
- For Render: Check `NODE_ENV=production` is set
- For Vercel: Environment variables must start with `VITE_`
- Check deployment logs for build errors

## 📁 Project Structure

```
care-portal-minorproject/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── .env.example     # Environment template
│   ├── index.js         # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios client
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── .env.example     # Environment template
│   ├── vite.config.js   # Vite configuration
│   └── package.json
│
├── DEPLOYMENT.md        # Deployment guide
├── ENV_SETUP.md         # Environment variables guide
└── README.md            # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Suraj Prakash** - [@surajprakash3](https://github.com/surajprakash3)

## 🙏 Acknowledgments

- MERN Stack Community
- React Router Documentation
- MongoDB Atlas
- Render & Vercel for hosting" 
