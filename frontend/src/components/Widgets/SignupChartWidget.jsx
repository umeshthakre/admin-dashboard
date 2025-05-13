import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SignupsBarChartWidget = ({ dataPoints }) => {
  // Convert input from [{ Monday: 0 }, ...] to separate arrays
  const labels = dataPoints.map(item => Object.keys(item)[0]);
  const values = dataPoints.map(item => Object.values(item)[0]);

  const data = {
    labels,
    datasets: [
      {
        label: 'User Signups',
        data: values,
        backgroundColor: '#1976d2',
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: 'Day' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Signups' },
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          User Signups (This Week)
        </Typography>
        <Box>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SignupsBarChartWidget;
