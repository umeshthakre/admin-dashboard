import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';

const TotalReportsWidget = ({ totalReports }) => {
  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Total Reports
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalReports}
            </Typography>
          </Box>
          <AssessmentIcon color="primary" sx={{ fontSize: 40 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalReportsWidget;
