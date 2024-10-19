import React, { useState } from 'react';

function GoalPlanner({ onSubmitGoal }) {
  const [retirementAge, setRetirementAge] = useState('');
  const [targetSavings, setTargetSavings] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      retirementAge,
      targetSavings,
      currentSavings,
      monthlyContribution,
    };
    onSubmitGoal(goalData);
  };

  return (
    <div className="goal-form">
      <h2>Set Your Retirement Goal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Retirement Age:</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Target Savings ($):</label>
          <input
            type="number"
            value={targetSavings}
            onChange={(e) => setTargetSavings(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Current Savings ($):</label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Monthly Contribution ($):</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            required
          />
        </div>
        <button type="submit">Set Goal</button>
      </form>
    </div>
  );
};

export default GoalPlanner;
