import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'primary.main',
      }}
    >
      <img
        src="/logo.jpg"
        alt="Majestic Insurance Logo"
        style={{ height: 40, marginRight: 8 }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          letterSpacing: '-0.5px',
        }}
      >
        Majestic Insurance
      </Typography>
    </Box>
  );
};

export default Logo;