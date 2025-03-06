import { Box, Button, Card, Container, Grid, Typography, Tabs, Tab, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SecurityIcon from '@mui/icons-material/Security';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';

const Policies = () => {
  const [activeTab, setActiveTab] = useState(0);

  const policies = [
    {
      type: 'Life Insurance',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      plans: [
        {
          name: 'Term Life Basic',
          coverage: '$250,000',
          premium: '$25/month',
          features: ['Death benefit', '10-year term', 'No medical exam required'],
        },
        {
          name: 'Whole Life Premium',
          coverage: '$500,000',
          premium: '$75/month',
          features: ['Lifetime coverage', 'Cash value accumulation', 'Fixed premiums'],
        },
      ],
    },
    {
      type: 'Health Insurance',
      icon: <HealthAndSafetyIcon sx={{ fontSize: 40 }} />,
      plans: [
        {
          name: 'Essential Care',
          coverage: 'Basic Coverage',
          premium: '$150/month',
          features: ['Primary care visits', 'Emergency services', 'Prescription drugs'],
        },
        {
          name: 'Premium Care Plus',
          coverage: 'Comprehensive',
          premium: '$300/month',
          features: ['Specialist visits', 'Mental health coverage', 'Dental & Vision'],
        },
      ],
    },
    {
      type: 'Auto Insurance',
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      plans: [
        {
          name: 'Basic Coverage',
          coverage: 'Standard',
          premium: '$80/month',
          features: ['Liability coverage', 'Collision coverage', 'Personal injury protection'],
        },
        {
          name: 'Full Coverage Plus',
          coverage: 'Comprehensive',
          premium: '$150/month',
          features: ['Comprehensive coverage', 'Roadside assistance', 'Rental car coverage'],
        },
      ],
    },
    {
      type: 'Home Insurance',
      icon: <HomeIcon sx={{ fontSize: 40 }} />,
      plans: [
        {
          name: 'Basic Protection',
          coverage: '$300,000',
          premium: '$100/month',
          features: ['Dwelling coverage', 'Personal property', 'Liability protection'],
        },
        {
          name: 'Premium Protection',
          coverage: '$500,000',
          premium: '$175/month',
          features: ['Extended dwelling coverage', 'Additional structures', 'Loss of use coverage'],
        },
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Insurance Policies
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Choose from our range of comprehensive insurance plans
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 4 }}
          >
            {policies.map((policy, index) => (
              <Tab
                key={policy.type}
                label={policy.type}
                icon={policy.icon}
                iconPosition="start"
                value={index}
              />
            ))}
          </Tabs>

          <Grid container spacing={3}>
            {policies[activeTab].plans.map((plan, index) => (
              <Grid item xs={12} md={6} key={plan.name}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h5" gutterBottom>
                        {plan.name}
                      </Typography>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {plan.premium}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Coverage: {plan.coverage}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      {plan.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 3 }}
                    >
                      Get Started
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Policies;