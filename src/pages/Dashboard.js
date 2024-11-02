import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperVision from '../pages/SuperVision.js';
import Retirement from '../pages/Retirement.js';
import SuperReports from '../pages/SuperReports.js';
import YourProfile from '../pages/YourProfile.js';
import Logout from '../services/Logout.js';
import defaultProfile from '../assets/images/defaultProfile.jpg';

function Dashboard() {
  // State
  const [activeSection, setActiveSection] = useState('SuperVision');
  const [currentUser, setCurrentUser] = useState();
  const [profileImage, setProfileImage] = useState();

  const navigate = useNavigate();

  // Check user is login
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession && userSession.isUserLoggin) {
      navigate('/dashboard');
    }
    fetchUserData();
  }, [navigate]);

    
  // Get User data
  const fetchUserData = async () => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession) {
      const email = userSession.email;
      try {
        const response = await fetch(`https://ntv2nwb8ri.execute-api.us-east-1.amazonaws.com/GetUserData?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const results = await response.json();
        const data = await JSON.parse(results.body);

        if (data.success) {
          setCurrentUser(data.data);
          console.log(data.data);
          setProfileImage(data.data.profileImage);
        } else {
          console.error('Error:', data.message);
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
    }
  };

  // Refresh changed data
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'SuperVision') {
      fetchUserData();
    }
  };
  // Links to sidebar
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'SuperVision':
        return <SuperVision userData={currentUser} />;
      case 'Super Retirement':
        return <Retirement userData={currentUser} />;
      case 'Super Reports':
        return <SuperReports userData={currentUser} />;
      case 'Your Profile':
        return <YourProfile userData={currentUser} />;
      case 'Logout':
        return <Logout />;
      default:
        return <SuperVision userData={currentUser} />;
    }
  };
  // Active sidebar class
  const getClass = (section) => {
    return `block p-4 border-b-2 w-full text-left transition ${
      activeSection === section
        ? 'bg-blue-900 text-white'
        : 'border-transparent hover:border-gray-light hover:bg-gray-light'
    }`;
  };

  return (
    <div className="flex min-h-screen bg-white text-black rounded-lg">
      <div className="w-64 text-black flex flex-col p-4 h-screen border-r border-gray-light">
        {/* User Profile Section */}
        {currentUser ? (
          <div className="flex items-center mb-8">
            <img
              src={profileImage || defaultProfile}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{currentUser.firstName} {currentUser.lastName}</h2>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p>Loading user data...</p>
          </div>
        )}

        <nav>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('SuperVision')}
                className={getClass('SuperVision')}
              >
                SuperVision
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('Super Retirement')}
                className={getClass('Super Retirement')}
              >
                Super Retirement
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('Super Reports')}
                className={getClass('Super Reports')}
              >
                Super Reports
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('Your Profile')}
                className={getClass('Your Profile')}
              >
                Your Profile
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('Logout')}
                className={getClass('Logout')}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-8">
        {renderActiveComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
