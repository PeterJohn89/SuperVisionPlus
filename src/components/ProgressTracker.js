import React from 'react';

const ProgressTracker = ({ progressData }) => {
  const { currentSavings, targetSavings, projectedSavings } = progressData;

  const progressPercentage = ((currentSavings / targetSavings) * 100).toFixed(2);

  return (
    <div className="progress-tracker">
      <h2>Your Progress</h2>
      <p>Current Savings: ${currentSavings}</p>
      <p>Target Savings: ${targetSavings}</p>
      <p>Projected Savings at Retirement: ${projectedSavings}</p>
      <p>Progress: {progressPercentage}%</p>
      {progressPercentage < 100 ? (
        <p>Recommendation: Increase monthly contributions to reach your target savings.</p>
      ) : (
        <p>Great! You're on track to meet your goal.</p>
      )}
    </div>
  );
};

export default ProgressTracker;
