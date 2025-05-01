import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  Typography,
  Paper,
  Snackbar,
  Alert,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Icon from '@/src/utils/Icon'; // Ensure this path is correct for your Icon component
import OtpInput from 'react-otp-input'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LoginPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(14, 125, 236)',
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'rgb(14, 125, 236)',
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              borderColor: 'rgb(14, 125, 236)',
            },
          },
        },
      },
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 5) {
      setPasswordError('Password must be at least 5 characters');
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one capital letter');
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number');
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('Password must contain at least one special character');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      setOtpSent(true);
      setError('OTP sent to your email');
      setOpen(true);
    } catch (err) {
      setError('Check your email and password');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6){
      setOtpError('Otp must be 6 digits');
      
    }else if (otp === '123456') {
      setError('OTP verified successfully');
      setOpen(true);
      router.push('/dashboard');
    } else {
      setOtpError('Invalid OTP');
    }
  };

  const handleOtpChange = (otpValue: any) => {
    setOtp(otpValue);
    setOtpError('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        flexDirection="column"
        sx={{
          background: 'linear-gradient(135deg, rgb(14, 125, 236) 0%, #e9ecef 100%)',
          px: 2,
          py: 2,
        }}
      >
        {!otpSent ? (
          <>
            <Typography variant="h4" color="white" fontWeight="bold" mb={2}>
              Glintai
            </Typography>

            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 6,
                maxWidth: 440,
                width: '330px',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.87)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'black',
              }}
            >
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={3}>
                <LockOutlinedIcon sx={{ fontSize: '30px', color: 'black', marginRight: 1 }} />
                <Typography variant="h6" fontWeight="bold" color="black" textAlign="center">
                  Login to Admin Portal
                </Typography>
              </Box>

              <form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ pb: 4 }}>
                  <TextField
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    autoComplete="off"
                    InputLabelProps={{
                      sx: {
                        color: 'black',
                        top: '-15%',
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '40px',
                        color: 'black',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'black',
                      },
                    }}
                    fullWidth
                  />
                </FormControl>

                <FormControl fullWidth sx={{ pb: 4 }}>
                  <TextField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    autoComplete="off"
                    InputLabelProps={{
                      sx: {
                        top: '-15%',
                        color: 'black',
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { color: 'black', fontSize: '0.875rem' },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '40px',
                      },
                      '& .MuiFormHelperText-root': {
                        color: 'black',
                      },
                    }}
                    fullWidth
                  />
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    bgcolor: 'rgb(66, 74, 84)',
                    height: '40px',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                   
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <Typography variant="body2" textAlign="left" mt={2}>
                <Link href="/#">
                  <Typography
                    component="span"
                    color="rgb(66, 74, 84)"
                    sx={{
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      display: 'inline-block',
                      px: 1.0,
                      py: 0.3,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Forgot Password
                  </Typography>
                </Link>
              </Typography>
            </Paper>
          </>
        ) : (
          <Paper
            elevation={10}
            sx={{
              p: 4,
              px:0,
              borderRadius: 6,
              maxWidth: 440,
              width: '330px',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'white',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
              border: ' solid rgba(255, 255, 255, 0.3)',
              color: 'white',
            }}
          >
            <form noValidate onSubmit={handleOtpSubmit}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" color="black" textAlign="center">
                  Enter OTP
                </Typography>
              </Box>
              <Box display= 'flex' flexDirection="column" alignItems='center' mb={3}>
              <OtpInput
        numInputs={6}
        value={otp}
        
        onChange={handleOtpChange}
        renderInput={(props) =>( <input {...props} style={{ 
          width: '40px',backgroundColor: 'whitesmoke', color: "black", height: '40px', margin: '0 3px', textAlign: 'center', fontSize: '1.3rem', borderRadius: '10px', border: '2px solid #ddd', outline: 'none', }}
          onFocus={(e)=> e.target.style.borderColor = 'rgb(96, 143, 201)'}
          onBlur = {(e) => e.target.style.borderColor= '#ddd'}
          />
        )}
        />

  {otpError && <Typography color="error">{otpError}</Typography>}

              </Box>
             


              <Button
                variant="contained"
                color="primary"
                onClick={handleOtpSubmit}
                type='submit'
                sx={{
                  bgcolor: 'rgb(66, 74, 84)',
                  width: '250px',
                  height: '40px',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  display: 'block',
                  margin: '0 auto',
               
                }}
              >
                Verify OTP
              </Button>
            </form>
          </Paper>
        )}

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity={otpSent ? 'success' : 'error'} sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
