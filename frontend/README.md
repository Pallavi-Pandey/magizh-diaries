# Student Diary System - Frontend

A modern, responsive React frontend for the Student Diary System with beautiful UI and smooth animations.

## 🎨 Features

- **Admin Dashboard**: Manage students, diary entries, and marks with full CRUD operations
- **Parent Share Views**: Beautiful read-only views for parents to access diary entries and marks via share links
- **Modern Design**: Dark theme with vibrant colors, glassmorphism effects, and smooth animations
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant feedback with loading states and success/error notifications

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Alert.jsx       # Alert/notification component
│   │   ├── Loading.jsx     # Loading spinner
│   │   ├── Modal.jsx       # Modal dialog
│   │   ├── StudentForm.jsx # Student form
│   │   ├── DiaryForm.jsx   # Diary entry form
│   │   └── MarksForm.jsx   # Marks form
│   ├── pages/              # Page components
│   │   ├── AdminDashboard.jsx  # Main admin interface
│   │   ├── ShareDiary.jsx      # Public diary view
│   │   └── ShareMarks.jsx      # Public marks view
│   ├── services/           # API services
│   │   └── api.js         # Axios API configuration
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Design system & styles
├── .env                   # Environment variables
└── package.json
```

## 🎯 Usage

### Admin Dashboard

1. **Manage Students**
   - Click "Add Student" to create a new student
   - Click on a student row to view their diary entries and marks
   - Edit or delete students using the action buttons

2. **Diary Entries**
   - Select a student first
   - Click "Add Entry" to create a new diary entry
   - Fill in homework, classwork, attendance, and remarks
   - Click "Share" to copy the parent share link

3. **Marks**
   - Select a student first
   - Click "Add Marks" to create a new marks entry
   - Enter subject, test details, and marks
   - Click "Share" to copy the parent share link

### Parent Views

Share links follow this format:
- Diary: `http://localhost:5173/share/diary/{share_key}`
- Marks: `http://localhost:5173/share/marks/{share_key}`

Parents can view:
- **Diary**: Date, attendance, homework, classwork, and teacher's remarks
- **Marks**: Subject, test details, score, percentage, and grade

## 🎨 Design System

### Color Palette

- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Accent**: Teal (#14b8a6)
- **Background**: Dark slate (#0f172a)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components

All components follow a consistent design system with:
- Smooth transitions and animations
- Hover effects for interactive elements
- Responsive layouts
- Accessible color contrasts

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000/api
```

### API Integration

The app connects to the backend API using Axios. All API calls are centralized in `src/services/api.js`.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎭 Features Showcase

### Admin Dashboard
- Three-column layout for students, diary entries, and marks
- Real-time filtering based on selected student
- Modal forms for creating/editing records
- One-click share link copying

### Parent Views
- Clean, read-only interface
- Beautiful card-based layout
- Automatic grade calculation for marks
- Motivational messages based on performance

## 🚀 Deployment

### Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy

You can deploy the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- etc.

## 🔐 Security Notes

- The frontend assumes the backend handles authentication
- Share links are public and should be treated as sensitive
- In production, implement proper CORS configuration
- Use HTTPS for all API communications

## 📝 License

This project is part of the Student Diary System.
