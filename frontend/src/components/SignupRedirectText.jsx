import React from "react";
import { Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const SignupRedirectText = () => {
  return (
    <Typography variant="body2">
      Don&apos;t have an account?{" "}
      <MuiLink component={RouterLink} to="/signup" underline="hover">
        Sign up
      </MuiLink>
    </Typography>
  );
};

export default SignupRedirectText;
