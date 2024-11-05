import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaPiggyBank, FaFlagCheckered, FaExclamationTriangle } from 'react-icons/fa'; // Import icons

// Register Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SuperVision = ({ userData }) => {
  // State
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Init progress bar
  useEffect(() => {
    if (userData?.superannuationBalance && userData?.retirementGoal) {
      let progress = (userData.superannuationBalance / userData.retirementGoal) * 100;
      if (progress > 100) {
        progress = 100; // Cap the progress at 100%
      }
      setProgressPercentage(progress);
    }
  }, [userData]);

  const chartData = {
    labels: ['Progress'],
    datasets: [
      {
        label: 'Completion (%)',
        data: [progressPercentage],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Retirement Progress (age 65)',
      },
    },
    scales: {
      y: {
        min: 0, 
        max: 100,
      },
    },
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Superannuation Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        {/* Current Superannuation Balance */}
        <div className="bg-blue-50 p-4 rounded-md shadow-md flex items-center">
          <FaPiggyBank className="text-4xl text-blue-600 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Current Superannuation Balance</h2>
            <p className="text-2xl font-bold mt-2">
              {userData?.superannuationBalance !== undefined
                ? `${Number(userData.superannuationBalance).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
              : null}
            </p>
          </div>
        </div>


        {/* Retirement Goal */}
        <div className="bg-green-50 p-4 rounded-md shadow-md flex items-center">
          <FaFlagCheckered className="text-4xl text-green-600 mr-4" />
          <div>
            <h2 className="text-lg font-semibold">Retirement Goal</h2>
            <p className="text-2xl font-bold mt-2">
              ${userData?.retirementGoal?.toLocaleString() || 'Set your goal in Super Retirement'}
            </p>
          </div>
        </div>
        
        {/* Progress Towards Goal */}
        {progressPercentage ? (
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Progress Towards Goal</h2>
            <div className="w-full bg-slate-100 rounded-full h-6 mt-2">
              <div
                className="bg-blue-600 h-6 rounded-full"
                style={{ width: `${progressPercentage}%`, transition: 'width 0.5s ease' }} // Smooth animation
              ></div>
            </div>
            <p className="mt-2 font-semibold">{progressPercentage.toFixed(2)}% Complete</p>
            {progressPercentage === 100 ? (
              <p className="text-green-600 mt-1">Congratulations! You have met your retirement goal. Try setting a new one!</p>
            ) : progressPercentage >= 80 ? (
              <p className="text-green-600 mt-1">You are on track!</p>
            ) : (
              <p className="text-red-600 mt-1">Consider boosting your contributions.</p>
            )}
          </div>
        ) : null}

        {/* Recommended Actions */}
        <div className="bg-yellow-50 p-4 rounded-md shadow-md">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-4xl text-yellow-600 mr-4" />
            <h2 className="text-lg font-semibold">Recommended Actions</h2>
          </div>
          <ul className="list-disc pl-5 mt-2">
            <li>Increase your monthly super contributions.</li>
            <li>Review your investment strategy.</li>
            <li>Check for any lost superannuation.</li>
          </ul>
        </div>
      </div>

      {/* Chart */}
      <div className="max-w-4xl p-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default SuperVision;