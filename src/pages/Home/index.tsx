import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #2E3B55 30%, #4C5F8A 90%)',
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 8, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 2,
                    fontWeight: 800,
                  }}
                >
                  Protect What Matters Most
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
                  Comprehensive insurance solutions tailored to your needs. Experience peace of mind with our trusted coverage.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    to="/policies"
                    variant="outlined"
                    sx={{ color: 'white', borderColor: 'white' }}
                    size="large"
                  >
                    View Plans
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.img
                src="/life-insurance.jpg"
                alt="Insurance Protection"
                style={{
                  width: '100%',
                  maxWidth: 600,
                  borderRadius: 12,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {[
            {
              icon: <SecurityIcon sx={{ fontSize: 40 }} />,
              title: 'Life Insurance',
              description: "Secure your family's future with our comprehensive life insurance plans.",
            },
            {
              icon: <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
              title: 'Health Insurance',
              description: "Get access to the best healthcare with our extensive coverage options.",
            },
            {
              icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
              title: 'Auto Insurance',
              description: "Protect your vehicle with our reliable auto insurance coverage.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">{feature.description}</Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;