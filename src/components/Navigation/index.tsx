import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button component={Link} to="/policies" color="inherit">
        Policies
      </Button>
      <Button component={Link} to="/claims" color="inherit">
        Claims
      </Button>
      <Button component={Link} to="/login" variant="outlined" color="primary">
        Login
      </Button>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        color="primary"
        sx={{ px: 3 }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Navigation;