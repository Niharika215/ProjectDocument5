import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faCog} />
      </button>
      <ul className="sidebar-menu">
        <li>
          <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
          <span className={`sidebar-text ${isSidebarOpen ? 'visible' : 'hidden'}`}>Dashboard</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
          <span className={`sidebar-text ${isSidebarOpen ? 'visible' : 'hidden'}`}>Metrics</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
          <span className={`sidebar-text ${isSidebarOpen ? 'visible' : 'hidden'}`}>Settings</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
