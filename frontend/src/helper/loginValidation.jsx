export const validateLogin = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Invalid email format' };
    }
  
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters' };
    }
  
    return { isValid: true, message: 'Validation successful' };
  };
  