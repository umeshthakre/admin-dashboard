import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../helper/AuthContext';

const menuItems = [
  { text: 'Overview', icon: <DashboardIcon />, path: '/' },
  { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
  { text: 'Users', icon: <AnalyticsIcon />, path: '/users' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const Sidebar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }) => {
  const {logout} = useAuth();
  
  const drawerContent = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          component={NavLink}
          to={item.path}
          sx={{
            '&.active': {
              backgroundColor: 'primary.main',
              color: '#fff',
              '& .MuiListItemIcon-root': {
                color: '#fff',
              },
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      <ListItem
        button
        component={NavLink}
        to="/login"
        sx={{
          '&.active': {
            backgroundColor: 'primary.main',
            color: '#fff',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
        }}
      >
        <ListItemIcon><LogoutIcon /></ListItemIcon>
        <ListItemText onClick={() => logout()} primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Permanent Drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
