import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TotalUsersWidget from '../components/Widgets/TotalUsers'; // Example widget
import SignupsBarChartWidget from '../components/Widgets/SignupChartWidget';
import ReportStatusBarChartWidget from '../components/Widgets/ReportStatusBarChartWidget';
import TotalReportsWidget from '../components/Widgets/TotalReportsWidget';
import WeeklyReportGenerationWidget from '../components/Widgets/WeeklyReportGenerationWidget';
import TopUsersReportWidget from '../components/Widgets/TopUsersReportWidget';
import UserReportBarGraphWidget from '../components/Widgets/UserReportBarGraphWidget';
import RecentReportsWidget from '../components/Widgets/RecentReportsWidget';
import { useGetAnalyticsQuery } from '../services/api';

const Overview = () => {

  const {data,isLoading,error}= useGetAnalyticsQuery({forceRefetch: true});

  console.log('data',data);
  console.log('recent report',data?.recentReport)
  

  if(!data){
    return <>Loading</>
  }

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Overview
      </Typography>
      <Grid container spacing={2}>
        <TotalUsersWidget total={data?.userCount || 100} />
        <SignupsBarChartWidget
          dataPoints={data?.userWeeklySignups}
        />
        <ReportStatusBarChartWidget
         generatedCount={data?.userReportStats?.withReports}
         notGeneratedCount={data?.userReportStats?.withoutReports} />
        {/* <TotalReportsWidget totalReports={200} /> */}
        <TotalReportsWidget totalReports={data?.reportCount || 100} />
        <WeeklyReportGenerationWidget
          weeklyData={data?.weeklyReportCreation}
        />
        <UserReportBarGraphWidget
          userReports={data?.topUsersByReport}
        />

        <RecentReportsWidget
          reports={data?.recentReport || 100}
        />

      </Grid>
    </Box>
  );
};

export default Overview;
