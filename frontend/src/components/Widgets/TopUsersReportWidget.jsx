import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Divider,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const TopUsersReportWidget = ({ users }) => {
  return (
    <Card elevation={3} sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Top 5 Users by Reports Generated
        </Typography>
        <List>
          {users.map((user, index) => (
            <Box key={user.id || index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`Reports: ${user.reportCount}`}
                />
              </ListItem>
              {index < users.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TopUsersReportWidget;
