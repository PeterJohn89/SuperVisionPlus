import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SuperReports({ userData }) {
  const [retirementGoalDisplay, setRetirementGoalDisplay] = useState('');
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Superannuation Performance ($)',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    if (!userData) return;

    const fetchData = async () => {
      const initialBalance = Number(userData.superannuationBalance) || 0;
      const retirementGoal = Number(userData.retirementGoal) || 0;
      const retirementAge = Number(userData.retirementAge) || 0;
      const annualSalary = Number(userData.annualSalary) || 0;
      const additionalContributions = Number(userData.additionalContributions) || 0;
      const contributionFrequency = userData.contributionFrequency ? userData.contributionFrequency.toUpperCase() : 'Y';

      const dob = new Date(userData.DOB);
      const currentYear = new Date().getFullYear();
      const currentAge = currentYear - dob.getFullYear();

      // Determine years to retirement annually
      const years = [];
      const values = [];
      for (let year = currentYear; year <= currentYear + (retirementAge - currentAge); year++) {
        years.push(year);
      }

      // Determine contribution frequency multiplier
      let frequencyMultiplier;
      switch (contributionFrequency) {
        case 'W': frequencyMultiplier = 52; break; 
        case 'M': frequencyMultiplier = 12; break;  
        case 'Q': frequencyMultiplier = 4; break;   
        default: frequencyMultiplier = 1;
      }

      // Use a fixed annual growth rate (e.g., 5%)
      const annualGrowthRate = 0.05;

      let currentBalance = initialBalance;
      // Populate values array with growth and contributions for each year
      for (let i = 0; i < years.length; i++) {
        // Calculate growth
        currentBalance += currentBalance * annualGrowthRate;
        
        // Calculate total contributions (salary-based and additional)
        const totalAnnualContribution = (annualSalary * 0.11) + (additionalContributions * frequencyMultiplier);
        currentBalance += totalAnnualContribution; // Contributions for the current year
        // Round and store current balance for chart
        values.push(Math.round(currentBalance));
      }

      setRetirementGoalDisplay(retirementGoal);
      setData({
        labels: years,
        datasets: [
          {
            label: 'Superannuation Performance ($)',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: false, // Set fill to false for a line chart
          },
        ],
      });
    };

    fetchData();
  }, [userData]);

  const handleDownloadReport = () => {
    const pdf = new jsPDF();
    pdf.text('Performance Report', 20, 20);
    pdf.text('This report summarizes your superannuation performance over the years.', 20, 30);
    pdf.text('Performance Data:', 20, 50);
    data.labels.forEach((label, index) => {
      pdf.text(`${label}: $${data.datasets[0].data[index]}`, 20, 60 + index * 10);
    });
    pdf.save('superannuation_report.pdf');
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-6">Performance Reports</h1>
      <p className="text-sm text-gray-600 mb-4">
        This chart illustrates your superannuation balance growth, shown annually until retirement.
      </p>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Your retirement goal: ${Number(retirementGoalDisplay).toLocaleString()}
        </h2>
        <Line 
          data={data} 
          options={{ 
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Balance ($)',
                },
                ticks: {
                  callback: (value) => `$${value.toLocaleString()}`,
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Year (Annual)',
                },
              },
            },
          }} 
        />
      </div>
      <button
        onClick={handleDownloadReport}
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
      >
        Download Report
      </button>
    </div>
  );
};

export default SuperReports;
