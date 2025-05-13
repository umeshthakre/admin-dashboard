import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDistanceToNow } from 'date-fns';

const RecentReportsWidget = ({ reports }) => {
  const report = reports?.[0];

  if (!report) {
    return (
      <Card elevation={3} sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Recent Reports Generated
          </Typography>
          <Typography variant="body2" color="textSecondary">
            No recent reports available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <CardContent>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
          sx={{ fontSize: '0.85rem' }}
        >
          Recent Report Generated
        </Typography>
        <List>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  {report.name}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ fontSize: '0.8rem' }}
                  >
                    {"User: "+report.user.name}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={0.5}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
                    </Typography>
                  </Box>
                </>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentReportsWidget;
