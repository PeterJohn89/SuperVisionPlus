import React, { useState } from 'react';

function Retirement({ userData }) {
  
  // State
  const [salary, setSalary] = useState('');
  const [contributionRate, setContributionRate] = useState(userData?.employerContributionRate || 11);
  const [retirementAge, setRetirementAge] = useState(userData?.retirementAge || '');
  const [additionalContributions, setAdditionalContributions] = useState(userData?.additionalContributions || '');
  const [contributionFrequency, setContributionFrequency] = useState(userData?.contributionFrequency || 'yearly');
  const [totalSuperDisplay, setTotalSuperDisplay] = useState(0);
  const [totalUserContributionDisplay, setTotalUserContributionDisplay] = useState('');
  const [totalEmployerContributionDisplay, setTotalEmployerContributionDisplay] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const calculateSavings = () => {
    // Retirement age
    const dob = new Date(userData.dob);
    const today = new Date();
    const currentAge = today.getFullYear() - dob.getFullYear();
    const yearsToRetire = retirementAge - currentAge;
  
    // Check retirement age
    if (yearsToRetire <= 0) {
      setErrorMessage('Retirement age must be greater than your current age.');
      return;
    }
  
    // Contribution amount
    let contributionMultiplier = 1;
    switch (contributionFrequency) {
      case 'weekly':
        contributionMultiplier = 52;
        break;
      case 'monthly':
        contributionMultiplier = 12;
        break;
      case 'quarterly':
        contributionMultiplier = 4;
        break;
      case 'yearly':
      default:
        contributionMultiplier = 1;
        break;
    }
  
    // Employer contribution
    const employerContribution = (salary * contributionRate) / 100;
  
    // User contribution
    const userContribution = additionalContributions * contributionMultiplier;
  
    // Add up total contribution
    const totalEmployerContribution = employerContribution * yearsToRetire;
    const totalUserContributions = userContribution * yearsToRetire;
    const totalSuperannuation = totalEmployerContribution + totalUserContributions + Number(userData.superAmount);

    // Ensure totalSuperannuation is a number
    const totalSuperannuationNumber = Number(totalSuperannuation);
  
    // Set calculations
    setTotalUserContributionDisplay(totalUserContributions.toFixed(2));
    setTotalEmployerContributionDisplay(totalEmployerContribution.toFixed(2));
    setTotalSuperDisplay(totalSuperannuationNumber.toFixed(2));
    setErrorMessage('');
  };
  
  // Save new Retirement goal
  const handleSubmit = async (e) => {
    e.preventDefault();
    const retirementGoal = Number(totalSuperDisplay);
    // API call
    try {
      const response = await fetch('https://s9yjz374cf.execute-api.ap-southeast-2.amazonaws.com/retirement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            email: userData.email,
            retirementGoal: retirementGoal,
            retirementAge: retirementAge
          }
        ),
      });
      
      // Response
      const results = await response.json();
      const data = await JSON.parse(results.body);

      console.log(data);
      
      // Result
      if (data.success) {
        setSuccessMessage('Retirement goal saved successfully!');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Error saving retirement goal.');
        setSuccessMessage(''); 
      }
    } catch (error) {
      setErrorMessage('An error occurred while saving your retirement goal.');
      setSuccessMessage('');
    }
  };

  const hasUserData = salary || contributionRate || retirementAge || additionalContributions || contributionFrequency;

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Your Retirement Plan</h1>

      {/* Messages */}
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {hasUserData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Salary ($)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Employer Contribution Rate (%)</label>
              <input
                type="number"
                value={contributionRate}
                onChange={(e) => setContributionRate(Number(e.target.value))}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Additional Contributions ($)</label>
              <input
                type="number"
                value={additionalContributions}
                onChange={(e) => setAdditionalContributions(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contribution Frequency</label>
              <select
                value={contributionFrequency}
                onChange={(e) => setContributionFrequency(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <button
            onClick={calculateSavings}
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
          >
            Calculate Retirement Goal
          </button>
        </>
      ) : (
        <div>
          <p>Please fill out the form to start planning for your retirement.</p>
        </div>
      )}

      {totalSuperDisplay > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold">Your Retirement Plan:</h2>
          <p className="text-sm text-gray-600 mt-2">This is only an estimate, and your super can change based on your salary.</p>
          <br></br>
          <p className="text-lg">{userData.firstName}</p>
          <p className="text-md">Current Age: {new Date().getFullYear() - new Date(userData.dob).getFullYear()}</p>
          <p className="text-md mb-4">Years until retirement: {retirementAge - (new Date().getFullYear() - new Date(userData.dob).getFullYear())}</p>

          <table className="table-auto w-full mt-4 text-left">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td className="border px-4 py-2 border-zinc-300">Your Current Super Balance</td>
                <td className="border px-4 py-2 border-zinc-300">
                  ${Number(userData.superAmount).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 border-zinc-300">Total Employer Contributions</td>
                <td className="border px-4 py-2 border-zinc-300">
                  ${Number(totalEmployerContributionDisplay).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 border-zinc-300">Your Contributions</td>
                <td className="border px-4 py-2 border-zinc-300">
                  ${Number(totalUserContributionDisplay).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 border-zinc-300 font-bold text-blue-500">Total Superannuation at Retirement</td>
                <td className="border px-4 py-2 border-zinc-300 font-bold text-blue-500">
                  ${Number(totalSuperDisplay).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition mt-4"
          >
            Save Retirement Goal
          </button>
        </div>
      )}

    </div>
  );
}

export default Retirement;