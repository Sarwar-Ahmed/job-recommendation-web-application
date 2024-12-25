import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Job Recommender
          </Typography>
          <Button color="inherit"><Link rel="icon" to="/" style={{textDecoration: 'none', color: 'inherit'}}>Profile</Link></Button>
          <Button color="inherit"><Link rel="icon" to="/login" style={{textDecoration: 'none', color: 'inherit'}}>Login</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header