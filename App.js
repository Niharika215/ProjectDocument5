import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';
import Sidebar from './sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [userMetric, setUserMetric] = useState('');
  const [industryData, setIndustryData] = useState('');
  const [percentile, setPercentile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleSubmit = () => {
    const industryArray = industryData.split(',').map(item => parseFloat(item.trim()));
    const userValue = parseFloat(userMetric);

    if (isNaN(userValue)) {
      alert("Please enter a valid number for your metric.");
      return;
    }

    if (industryArray.some(isNaN)) {
      alert("Please provide valid numbers for the industry data.");
      return;
    }

    axios.post('http://localhost:3000/api/benchmarks', { userMetric: userValue, industryData: industryArray })
      .then(response => {
        setPercentile(response.data.percentile);
        setErrorMessage('');

        setChartData({
          labels: ['Industry Data', 'Your Metric'],
          datasets: [
            {
              label: 'Metric Comparison',
              data: [...industryArray, userValue],
              backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        setErrorMessage('Error saving data: ' + error.response?.data?.error || 'Unknown error');
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <div className="container">
          <h1>Benchmarking Tool</h1>

          <div className="form-group">
            <label>Enter your metric: </label>
            <input 
              type="number" 
              value={userMetric} 
              onChange={(e) => setUserMetric(e.target.value)} 
              className="input-field" 
            />
          </div>

          <div className="form-group">
            <label>Enter industry data (comma-separated): </label>
            <input 
              type="text" 
              value={industryData} 
              onChange={(e) => setIndustryData(e.target.value)} 
              className="input-field" 
            />
          </div>

          <button className="btn" onClick={handleSubmit}>Compare</button>

          {errorMessage && <div className="error">{errorMessage}</div>}

          {percentile !== null && (
            <div className="percentile">
              <h3>Your metric is in the {percentile}% percentile</h3>
            </div>
          )}

          {chartData && (
            <div className="chart-container">
              <h2>Metric Comparison</h2>
              <Bar data={chartData} options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Industry vs Your Metric',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                      },
                    },
                  },
                },
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
