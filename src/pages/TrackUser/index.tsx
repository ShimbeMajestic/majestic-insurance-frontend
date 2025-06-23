import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  InputAdornment,
  Avatar,
  Stack,
  Divider,
  Fade,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import BadgeIcon from '@mui/icons-material/Badge';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { motion, AnimatePresence } from 'framer-motion';

const BACKEND_URL = 'https://api.majestic-insurance-backend.com/track-user';

const heroGradient = 'linear-gradient(135deg, #2E3B55 0%, #4C5F8A 100%)';
const bgGradient = 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 30%, #f3e8ff 60%, #ffe0b2 100%)';

const TrackUser = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [gps, setGps] = useState<{ lat: string; lng: string } | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      nid: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      mobile: Yup.string().required('Mobile number is required'),
      nid: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('mobile', values.mobile);
        formData.append('nid', values.nid);
        if (gps) {
          formData.append('latitude', gps.lat);
          formData.append('longitude', gps.lng);
        }
        images.forEach((img) => {
          formData.append('images', img);
        });
        const response = await fetch(BACKEND_URL, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) throw new Error('Failed to submit');
        setSnackbarMessage('User tracked successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setShowSuccess(true);
        resetForm();
        setImages([]);
        setGps(null);
        setTimeout(() => setShowSuccess(false), 2000);
      } catch (error) {
        setSnackbarMessage('Failed to track user.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGps({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
          });
        },
        () => {
          setSnackbarMessage('Unable to fetch GPS coordinates.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      );
    } else {
      setSnackbarMessage('Geolocation is not supported by this browser.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: bgGradient,
      py: { xs: 4, md: 8 },
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background pattern - FABULOUS */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 420,
          height: 420,
          background: 'radial-gradient(circle at 60% 40%, #c7d2fe 0%, #a5b4fc 60%, transparent 100%)',
          opacity: 0.55,
          zIndex: 0,
          filter: 'blur(12px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 80,
          right: -100,
          width: 320,
          height: 320,
          background: 'radial-gradient(circle at 40% 60%, #fbc2eb 0%, #f3e8ff 80%, transparent 100%)',
          opacity: 0.45,
          zIndex: 0,
          filter: 'blur(18px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: 0,
          width: 350,
          height: 350,
          background: 'radial-gradient(circle at 60% 80%, #ffe0b2 0%, #fff3e0 80%, transparent 100%)',
          opacity: 0.35,
          zIndex: 0,
          filter: 'blur(18px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -80,
          right: -80,
          width: 260,
          height: 260,
          background: 'radial-gradient(circle at 60% 60%, #f9a8d4 0%, #fbc2eb 80%, transparent 100%)',
          opacity: 0.32,
          zIndex: 0,
          filter: 'blur(16px)',
        }}
      />
      {/* Main content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Container maxWidth="sm" sx={{ mb: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                borderRadius: 4,
                background: heroGradient,
                boxShadow: 4,
                mb: 2,
              }}
            >
              <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'secondary.main', boxShadow: 3 }}>
                <VerifiedUserIcon sx={{ fontSize: 48, color: 'white' }} />
              </Avatar>
              <Typography variant="h3" fontWeight={800} color="white" gutterBottom align="center">
                Track User
              </Typography>
              <Typography variant="h6" color="white" align="center" sx={{ opacity: 0.85 }}>
                Seamlessly capture and confirm user details with elegance.
              </Typography>
            </Box>
          </motion.div>
        </Container>
        {/* Form Card Section */}
        <Container maxWidth="sm">
          <AnimatePresence>
            {!showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.7 }}
              >
                <Card sx={{ p: { xs: 2, sm: 4 }, boxShadow: 8, borderRadius: 4, background: 'rgba(255,255,255,0.98)' }}>
                  <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="name"
                          name="name"
                          label="Full Name"
                          variant="outlined"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            background: '#f7fafd',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e3e9f6' },
                              '&:hover fieldset': { borderColor: 'primary.light' },
                              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="mobile"
                          name="mobile"
                          label="Mobile Number"
                          variant="outlined"
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                          helperText={formik.touched.mobile && formik.errors.mobile}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneAndroidIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            background: '#f7fafd',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e3e9f6' },
                              '&:hover fieldset': { borderColor: 'primary.light' },
                              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="nid"
                          name="nid"
                          label="NID Number (optional)"
                          variant="outlined"
                          value={formik.values.nid}
                          onChange={formik.handleChange}
                          error={formik.touched.nid && Boolean(formik.errors.nid)}
                          helperText={formik.touched.nid && formik.errors.nid}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <BadgeIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            background: '#f7fafd',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: '#e3e9f6' },
                              '&:hover fieldset': { borderColor: 'primary.light' },
                              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Button
                            variant={gps ? 'contained' : 'outlined'}
                            color={gps ? 'success' : 'primary'}
                            startIcon={<MyLocationIcon />}
                            onClick={handleGetLocation}
                            sx={{ minWidth: 160, fontWeight: 700, boxShadow: gps ? 2 : 0 }}
                          >
                            {gps ? 'GPS Captured' : 'Capture GPS'}
                          </Button>
                          {gps && (
                            <Box sx={{ bgcolor: 'grey.100', px: 2, py: 1, borderRadius: 2, boxShadow: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                <b>Lat:</b> {gps.lat} <b>Lng:</b> {gps.lng}
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Button
                            variant="contained"
                            component="label"
                            startIcon={<PhotoCamera />}
                            sx={{ minWidth: 220, fontWeight: 700, background: 'secondary.main', '&:hover': { background: 'secondary.dark' } }}
                          >
                            Upload Confirmation Pictures
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              hidden
                              onChange={handleImageChange}
                            />
                          </Button>
                          {images.length > 0 && (
                            <Stack direction="row" spacing={1} alignItems="center">
                              {images.slice(0, 3).map((img, idx) => (
                                <Avatar
                                  key={idx}
                                  src={URL.createObjectURL(img)}
                                  alt={`confirmation-${idx}`}
                                  variant="rounded"
                                  sx={{ width: 48, height: 48, border: '2px solid', borderColor: 'primary.light', boxShadow: 2 }}
                                />
                              ))}
                              {images.length > 3 && (
                                <Box sx={{ ml: 1 }}>
                                  <Typography variant="caption" color="text.secondary">
                                    +{images.length - 3} more
                                  </Typography>
                                </Box>
                              )}
                            </Stack>
                          )}
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          color="secondary"
                          type="submit"
                          disabled={isSubmitting}
                          sx={{
                            py: 1.5,
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            letterSpacing: 1,
                            boxShadow: 3,
                            transition: 'all 0.2s',
                            '&:hover': {
                              background: 'linear-gradient(90deg, #FFA726 60%, #FFB74D 100%)',
                              transform: 'scale(1.03)',
                            },
                          }}
                          endIcon={isSubmitting && <CircularProgress size={22} color="inherit" />}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Success Animation */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}
              >
                <Fade in={showSuccess} timeout={600}>
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <Avatar sx={{ width: 100, height: 100, bgcolor: 'success.main', mx: 'auto', mb: 2, boxShadow: 4 }}>
                      <VerifiedUserIcon sx={{ fontSize: 60, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h4" fontWeight={800} color="success.main" gutterBottom>
                      Success!
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      User tracked successfully.
                    </Typography>
                  </Box>
                </Fade>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrackUser; 