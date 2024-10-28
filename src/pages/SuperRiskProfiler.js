import React, { useState } from 'react';

const SuperRiskProfiler = () => {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: ''
  });
  
  const [riskProfile, setRiskProfile] = useState('');
  
  const handleChange = (e, question) => {
    setAnswers({ ...answers, [question]: e.target.value });
  };

  const calculateRiskProfile = () => {
    let score = 0;
    
    // Scoring mechanism
    Object.values(answers).forEach(answer => {
      if (answer === 'high') score += 3;
      if (answer === 'medium') score += 2;
      if (answer === 'low') score += 1;
    });

    if (score >= 18) {
      setRiskProfile('Aggressive');
    } else if (score >= 12) {
      setRiskProfile('Moderate');
    } else {
      setRiskProfile('Conservative');
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Investment Risk Profiler</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">1. How comfortable are you with risk?</label>
          <select
            value={answers.question1}
            onChange={(e) => handleChange(e, 'question1')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">2. What is your investment horizon?</label>
          <select
            value={answers.question2}
            onChange={(e) => handleChange(e, 'question2')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">Over 10 years</option>
            <option value="medium">5-10 years</option>
            <option value="low">Less than 5 years</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">3. How do you react to market fluctuations?</label>
          <select
            value={answers.question3}
            onChange={(e) => handleChange(e, 'question3')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">I don't worry at all</option>
            <option value="medium">I feel concerned</option>
            <option value="low">I panic easily</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">4. What portion of your income do you invest?</label>
          <select
            value={answers.question4}
            onChange={(e) => handleChange(e, 'question4')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">More than 20%</option>
            <option value="medium">10-20%</option>
            <option value="low">Less than 10%</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">5. How often do you monitor your investments?</label>
          <select
            value={answers.question5}
            onChange={(e) => handleChange(e, 'question5')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">Daily</option>
            <option value="medium">Weekly</option>
            <option value="low">Monthly or less</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">6. How do you prioritize short-term vs. long-term goals?</label>
          <select
            value={answers.question6}
            onChange={(e) => handleChange(e, 'question6')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">I focus on long-term growth</option>
            <option value="medium">I balance both</option>
            <option value="low">I prioritize short-term gains</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">7. What would you do if your investment dropped by 20%?</label>
          <select
            value={answers.question7}
            onChange={(e) => handleChange(e, 'question7')}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select an option</option>
            <option value="high">Hold and buy more</option>
            <option value="medium">Hold</option>
            <option value="low">Sell</option>
          </select>
        </div>

        <button
          type="button"
          onClick={calculateRiskProfile}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Calculate Risk Profile
        </button>
      </form>

      {riskProfile && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">Your Risk Profile: {riskProfile}</h2>
          <p className="text-gray-600">Based on your answers, we recommend a(n) <strong>{riskProfile}</strong> investment strategy.</p>
        </div>
      )}
    </div>
  );
};

export default SuperRiskProfiler;
