import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../services/api';

const SettingsPage = () => {
  const id = JSON.parse(localStorage.getItem('user'))?._id;
  console.log(id)
  const { data } = useGetUserDetailsQuery(id);

  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Initialize values from API response when it arrives
  useEffect(() => {
    if (data) {
      setName(data.user?.name || '');
      setPhone(data.user?.phone || '');
    }
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error('Name cannot be empty');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      console.log('phone', phone)
      toast.error('Phone number must be 10 digits');
      return;
    }

    try {
      console.log('id', id, name, phone);
      const response = await updateUser({ id, name, phone }).unwrap();
      toast.success('Settings updated successfully!');
      setName(response.user.name);
      setPhone(response.user.phone);
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      pt={10}
    >
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Account Settings
        </Typography>
        <form onSubmit={handleSave}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={updating}
          >
            {updating ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
