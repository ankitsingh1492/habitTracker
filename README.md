# Habit Tracker Application

A full-stack habit tracking application built with React, TypeScript, Express, and MongoDB.

## 🏗️ Project Structure

```
habit-tracker/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── stores/       # State management
│   │   ├── types/        # TypeScript definitions
│   │   ├── utils/        # Helper functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── types/        # TypeScript definitions
│   │   └── server.ts
│   └── package.json
```

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Habit Management**: Create, update, and delete habits
- **Streak Tracking**: Automatic tracking of daily streaks
- **Profile Management**: Customize user profiles with pictures and personal info
- **Responsive Design**: Works on both desktop and mobile devices

## 💻 Tech Stack

### Frontend
- React 18
- TypeScript
- React Router
- State Management (Redux/Context)
- Tailwind CSS

### Backend
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker
```

2. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

3. **Setup Frontend**
```bash
cd client
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api/v1
```

## 📱 API Endpoints

### User Routes
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users/profile` - Get user profile

### Habit Routes
- `GET /api/v1/habits` - Get all habits
- `POST /api/v1/habits` - Create new habit
- `PUT /api/v1/habits/:id` - Update habit
- `DELETE /api/v1/habits/:id` - Delete habit

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 🚀 Deployment

The application can be deployed using Docker:

```bash
docker-compose up -d
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
