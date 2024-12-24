import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function goToTop() {
  document.documentElement.scrollTop = 0;

}

function Footer() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick = {()=> goToTop()}>Go To Top </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Footer