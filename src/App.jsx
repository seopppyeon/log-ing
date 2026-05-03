import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import LogCreate from './pages/LogCreate';
import { Plus } from 'lucide-react';
import './App.css';

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<LogCreate />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="main-content">
          <AnimatedRoutes />
        </div>
        
        {/* Floating Action Button */}
        <Link to="/new" className="floating-add-btn glass-panel">
          <Plus size={32} />
        </Link>
      </div>
    </BrowserRouter>
  );
}

export default App;
