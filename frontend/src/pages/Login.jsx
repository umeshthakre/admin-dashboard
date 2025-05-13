import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';
import { validateLogin } from '../helper/loginValidation';
import { useLoginMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';
import SignupRedirectText from '../components/SignupRedirectText';
import { useAuth } from '../helper/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login:loginAuth} = useAuth()
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async e => {

    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    const result = validateLogin(email, password);
    if (!result.isValid) {
      toast.error(result.message);
      return;
    }
    try {
      const { data,error } = await login({ email, password });

      console.log('error',error)
      if(error){
        toast.error(error.data.error)
        return;
      }

    console.log("login", data);
    if (data?.token) {
      toast.success('Login successful! Redirecting to dashboard... in 5 seconds');

      localStorage.setItem('token', data.token);
      // localStorage.setItem('user', JSON.stringify(data.user.mongoUser));
      loginAuth(data)
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }else{
      console.log("data",data);
      toast.error("Error while logging in please try again")
    }
      
    } catch (error) {
      console.log('error',error)
    }
    
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
      <Paper elevation={4} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <SignupRedirectText />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            { isLoggingIn ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
