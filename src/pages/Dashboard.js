import React, { useState, useEffect } from 'react';
import SuperVision from '../pages/SuperVision';
import Retirement from '../pages/Retirement';
import SuperReports from '../pages/SuperReports';
import YourProfile from '../pages/YourProfile';
import Logout from '../services/Logout';
import defaultProfile from '../assets/images/defaultProfile.jpg';

function Dashboard() {

  const [activeSection, setActiveSection] = useState('SuperVision');
  const [currentUser, setCurrentUser] = useState();
  const [profileImage, setProfileImage] = useState();

  // When component initiates run this api call
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    
    if (userSession) {
      const fetchUserData = async () => {
        const email = userSession.email;
        try {
          const response = await fetch(`https://ntv2nwb8ri.execute-api.us-east-1.amazonaws.com/GetUserData?email=${email}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
            }
          });

          const results = await response.json();
          const data = await JSON.parse(results.body);

          console.log(data.data);

          if (data.success) {
            setCurrentUser(data.data);
            setProfileImage(data.data.profileImg);
          } else {
            console.error('Error:', data.message);
          }
        } catch (err) {
          console.error('Error:', err.message);
        }
      };
      fetchUserData();
    }
  }, []); 
  

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
              src={ profileImage || defaultProfile }
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
                onClick={() => setActiveSection('SuperVision')}
                className={getClass('SuperVision')}
              >
                SuperVision
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection('Super Retirement')}
                className={getClass('Super Retirement')}
              >
                Super Retirement
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection('Super Reports')}
                className={getClass('Super Reports')}
              >
                Super Reports
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection('Your Profile')}
                className={getClass('Your Profile')}
              >
                Your Profile
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActiveSection('Logout')}
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