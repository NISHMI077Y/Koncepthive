import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Search, Bell, Moon, Sun, Menu } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen, onMenuClick }) => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
      <div className="navbar-left">
        <button className="navbar-icon-btn" onClick={onMenuClick} style={{ marginRight: '0.5rem' }}>
          <Menu />
        </button>

        <div className="navbar-search">
          <Search />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {isDarkMode ? <Sun /> : <Moon />}
        </button>

        <button className="navbar-icon-btn" title="Notifications">
          <Bell />
          <span className="notification-badge"></span>
        </button>

        <div className="navbar-avatar" title={user?.name}>
          {user?.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;