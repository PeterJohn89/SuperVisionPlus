import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SuperReports({ userData }) {
  const [retirementGoalDisplay, setRetirementGoalDisplay] = useState('');

  const [data, setData] = useState({
    labels: [], 
    datasets: [
      {
        label: 'Superannuation Performance ($)',
        data: [], // Performance data
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {

      const initialBalance = userData.superannuationBalance;
      const retirementGoal = userData.retirementGoal;
      const retirementAge = userData.retirementAge;
      const dob = new Date(userData.DOB);
      const currentYear = new Date().getFullYear();
      const currentAge = currentYear - dob.getFullYear();

      const years = [];
      const values = [];

      // Get years until you retire
      for (let year = currentYear; year <= currentYear + (retirementAge - currentAge); year++) {
        years.push(year);
      }

      // Get super contrubtions value
      const annualGrowthRate = (retirementGoal - initialBalance) / (retirementAge - currentAge) / initialBalance;

      let currentBalance = initialBalance;
      
      for (let i = 0; i < years.length; i++) {
        currentBalance += currentBalance * annualGrowthRate; 
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
            borderWidth: 1,
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

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Your retirement goal: ${Number(retirementGoalDisplay).toLocaleString()}</h2>
        <Bar data={data} options={{ responsive: true }} />
      </div>

      <button
        onClick={handleDownloadReport}
        className="bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
      >
        Download Report
      </button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Investment Insights</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Investment Choice</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Impact on Wealth ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-300 px-4 py-2">High Growth Fund</td>
              <td className="border-b border-gray-300 px-4 py-2">+ $10,000</td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 px-4 py-2">Balanced Fund</td>
              <td className="border-b border-gray-300 px-4 py-2">+ $5,000</td>
            </tr>
            <tr>
              <td className="border-b border-gray-300 px-4 py-2">Conservative Fund</td>
              <td className="border-b border-gray-300 px-4 py-2">+ $2,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperReports;
