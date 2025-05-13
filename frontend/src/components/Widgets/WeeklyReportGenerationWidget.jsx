import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyReportGenerationWidget = ({ weeklyData }) => {
  const dayMap = {
    Sunday: 'Sun',
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
  };

  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Convert full-name data to short-name format expected by chart
  const mappedData = Object.entries(weeklyData).reduce((acc, [day, value]) => {
    const shortDay = dayMap[day];
    if (shortDay) acc[shortDay] = value;
    return acc;
  }, {});

  const values = labels.map((day) => mappedData[day] || 0); // Fill missing days with 0

  const data = {
    labels,
    datasets: [
      {
        label: 'Reports Generated',
        data: values,
        backgroundColor: '#1976d2',
        borderRadius: 5,
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
        title: { display: true, text: 'Day of Week' },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Reports' },
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Weekly Report Generation
        </Typography>
        <Box>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeeklyReportGenerationWidget;
