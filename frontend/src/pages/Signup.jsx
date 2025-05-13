import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignupMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [signup, { isLoading: isSigningUp }] = useSignupMutation();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await signup({ name: fullName, email, password });
      console.log('Signup response:', response);

      if(response?.error?.data?.error){
        console.log('error',response.error.data.error)
        toast.error(response.error.data.error);
        return;
      }

      if(response?.error?.originalStatus === 429){
        toast.error('Too many requests, please try again later.');
        return;
      }

      if(response?.data?.success){
        toast.success('Signup successful! Redirecting to login... in 5 seconds');
        setFullName('');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }

     

    } catch (error) {
    
     if(error?.originalStatus === 429){
      toast.error('Too many requests, please try again later.');
      return;
     }

      if(error?.data?.errors){
        error.data.errors.forEach((error) => {
          toast.error(error);
        });
      }
      console.error('Signup error:', error?.data);
      toast.error(''+error.message);
    }

    

    // Simulate signup
    // Reset fields

  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
       <ToastContainer position="top-center" closeOnClick={false} />
      <Paper elevation={4} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            { isSigningUp ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignupPage;
