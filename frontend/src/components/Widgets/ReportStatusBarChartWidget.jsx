import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ReportStatusBarChartWidget = ({ generatedCount, notGeneratedCount }) => {
  const data = {
    labels: ['Generated', 'Not Generated'],
    datasets: [
      {
        label: 'Users',
        data: [generatedCount, notGeneratedCount],
        backgroundColor: ['#4caf50', '#f44336'],
        barThickness: 40,
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
        title: { display: true, text: 'Status' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'User Count' },
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Report Generation 
        </Typography>
        <Box>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportStatusBarChartWidget;
