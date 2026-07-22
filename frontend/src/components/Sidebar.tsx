import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CheckSquare, LogOut } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">T</div>
        <span className="sidebar-logo-text">TaskFlow</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <div className="sidebar-nav-item active" role="button">
              <LayoutDashboard />
              <span>Dashboard</span>
            </div>
          </li>
          <li>
            <a href="#" className="sidebar-nav-item">
              <CheckSquare />
              <span>Tasks</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="sidebar-nav-item" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}>
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;