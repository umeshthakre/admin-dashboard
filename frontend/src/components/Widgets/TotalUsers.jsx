import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const TotalUsersWidget = ({ total = 0 }) => {
  return (
    <Card elevation={3} sx={{ width: 300, p: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Total Users
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {total.toLocaleString()}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48 }}>
            <PeopleIcon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalUsersWidget;
