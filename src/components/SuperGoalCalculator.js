import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import CurrencyFormat from './CurrencyFormat.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SuperGoalCalculator = () => {
    const [contributionAmount, setContributionAmount] = useState(0);
    const [frequency, setFrequency] = useState('weekly'); // Default to weekly
    const [timeFrame, setTimeFrame] = useState(30); // Default to 30 years
    const [totalContributions, setTotalContributions] = useState(0);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        calculateTotalContributions();
    }, [contributionAmount, frequency, timeFrame]);

    const calculateTotalContributions = () => {
        const contributionsPerYear = {
            weekly: contributionAmount * 52,
            fortnightly: contributionAmount * 26,
            monthly: contributionAmount * 12,
            annually: contributionAmount,
        };

        const total = contributionsPerYear[frequency] * timeFrame;
        setTotalContributions(total);

        // Prepare chart data
        const contributionValues = Array.from({ length: timeFrame }, (_, index) => {
            return contributionsPerYear[frequency] * (index + 1);
        });

        setChartData({
            labels: Array.from({ length: timeFrame }, (_, index) => `${index + 1} Year`),
            datasets: [
                {
                    label: 'Total Contributions Over Time',
                    data: contributionValues,
                    backgroundColor: 'rgba(229, 126, 68, 0.5)',
                    borderColor: 'rgba(229, 126, 68, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };

    return (
        <div className="flex">
            <div className="w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-4">Contributions Calculator</h2>
                
                <div className="mb-4">
                    <label>Contribution Amount:</label>
                    <input
                        type="number"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(Number(e.target.value))}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label>Frequency:</label>
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="fortnightly">Fortnightly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label>Time Frame (Years):</label>
                    <select
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(Number(e.target.value))}
                        className="border rounded p-2 w-full"
                    >
                        <option value={10}>10 Years</option>
                        <option value={20}>20 Years</option>
                        <option value={30}>30 Years</option>
                    </select>
                </div>

                <h3 className="text-xl font-semibold">Total Contributions: 
                    <CurrencyFormat 
                        formattedAmount={totalContributions}
                    />
                </h3>
            </div>

            <div className="w-1/2 p-4">
                <Bar data={chartData} options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Total Contributions Amount ($)',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Years',
                            },
                        },
                    },
                }} />
            </div>
        </div>
    );
};

export default SuperGoalCalculator;
