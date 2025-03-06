import { useState } from 'react';
import { Box, Button, Card, Container, Grid, Typography, Chip, IconButton, Dialog, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Claims = () => {
  const [openNewClaim, setOpenNewClaim] = useState(false);

  const claims = [
    {
      id: 1,
      type: 'Auto Insurance',
      status: 'In Progress',
      date: '2024-01-15',
      amount: 2500,
      description: 'Minor collision damage repair',
    },
    {
      id: 2,
      type: 'Health Insurance',
      status: 'Approved',
      date: '2024-01-10',
      amount: 1200,
      description: 'Medical consultation and tests',
    },
  ];

  const formik = useFormik({
    initialValues: {
      type: '',
      amount: '',
      description: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Required'),
      amount: Yup.number().required('Required').positive('Must be positive'),
      description: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      setOpenNewClaim(false);
    },
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="bold">
              Insurance Claims
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenNewClaim(true)}
            >
              New Claim
            </Button>
          </Box>

          <Grid container spacing={3}>
            {claims.map((claim) => (
              <Grid item xs={12} key={claim.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <Typography variant="h6">{claim.type}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Claim #{claim.id}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          Amount
                        </Typography>
                        <Typography variant="h6">${claim.amount}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Chip
                          label={claim.status}
                          color={claim.status === 'Approved' ? 'success' : 'warning'}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {claim.date}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
                        <IconButton color="primary">
                          <TimelineIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      <Dialog open={openNewClaim} onClose={() => setOpenNewClaim(false)} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Submit New Claim
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="type"
              name="type"
              label="Claim Type"
              margin="normal"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              margin="normal"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              margin="normal"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setOpenNewClaim(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Claim
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Claims;