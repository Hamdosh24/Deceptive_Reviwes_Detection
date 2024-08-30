import React from 'react';  
import './LoadingPage.css';
import { Box, Typography } from '@mui/material';

const LoadingPage = () => {  
  return (  
    <Box className="loading-container">  
      <Box className="loading-spinner"></Box>  
      <Typography>Loading...</Typography>  
    </Box>  
  );  
};  

export default LoadingPage;