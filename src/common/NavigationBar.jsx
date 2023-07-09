// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Invoice System
        </Typography>
        <Button color="inherit" component={Link} to="/countries">
          Display Countries
        </Button>
        <Button color="inherit" component={Link} to="/cities">
          Display Cities
        </Button>
        <Button color="inherit" component={Link} to="/customers">
          Display Customers
        </Button>
        <Button color="inherit" component={Link} to="/items">
          Display Items
        </Button>
        <Button color="inherit" component={Link} to="/headdetails">
          Display HeadDetails
        </Button>
        <Button color="inherit" component={Link} to="/details">
          Display Details
        </Button>
      </Toolbar>
    </AppBar>
  );
}
