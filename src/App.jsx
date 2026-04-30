import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import LogCreate from './pages/LogCreate';
import { Home as HomeIcon, List as ListIcon, PlusCircle } from 'lucide-react';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/new" element={<LogCreate />} />
          </Routes>
        </div>
        
        {/* Bottom Navigation */}
        <nav className="bottom-nav glass-panel">
          <NavLink to="/" className="nav-item">
            <HomeIcon size={24} />
            <span>Ocean</span>
          </NavLink>
          <NavLink to="/list" className="nav-item">
            <ListIcon size={24} />
            <span>Logs</span>
          </NavLink>
          <NavLink to="/new" className="nav-item add-btn">
            <PlusCircle size={40} color="var(--primary)" />
          </NavLink>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
