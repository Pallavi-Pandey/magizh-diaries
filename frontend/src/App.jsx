import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ShareDiary from './pages/ShareDiary';

import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-brand">
              📚 Student Diary System
            </Link>
            <ul className="navbar-nav">
              <li>
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/share/diary/:shareKey" element={<ShareDiary />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
