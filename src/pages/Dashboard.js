import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
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
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Check user is logged in
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession && userSession.isUserLoggin) {
      navigate('/dashboard');
    }
    fetchUserData(true);
  }, [navigate]);

  // Get User data
  const fetchUserData = async (isLoading) => {

    const userSession = JSON.parse(localStorage.getItem('userSession'));

    if (userSession) {
      const email = userSession.email;
      if(isLoading){
        setIsLoading(true);
      }
      
      try {
        const response = await fetch(`https://7gt2ab4lda.execute-api.ap-southeast-2.amazonaws.com/getUser`, {
          method: 'POST',
          body: JSON.stringify({
            email
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const results = await response.json();
        const data = await JSON.parse(results.body);

        if (data.success) {
          setCurrentUser(data.data);
          setProfileImage(data.data.profileImage);
        } else {
          console.error('Error:', data.message);
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
      setIsLoading(false);
    }
  };

  // Refresh changed data
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'SuperVision') {
      fetchUserData(false);
    }
  };

  // Links to sidebar
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'SuperVision':
        return <SuperVision userData={currentUser} />;
      case 'SuperRetirement':
        return <Retirement userData={currentUser} />;
      case 'SuperReports':
        return <SuperReports userData={currentUser} />;
      case 'SuperProfile':
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
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900 z-50">
            <FontAwesomeIcon 
                icon={faPiggyBank} 
                className="text-3xl text-white"
            />
        </div>
      )}
      <div className="w-64 text-black flex flex-col p-4 h-screen border-r border-gray-light">
        {/* User Profile Section */}
        {currentUser && (
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
                onClick={() => handleSectionChange('SuperRetirement')}
                className={getClass('SuperRetirement')}
              >
                SuperRetirement
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('SuperReports')}
                className={getClass('SuperReports')}
              >
                SuperReports
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => handleSectionChange('SuperProfile')}
                className={getClass('SuperProfile')}
              >
                SuperProfile
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
