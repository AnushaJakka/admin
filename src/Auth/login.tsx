import React, { useState, useEffect } from 'react';
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
import OtpInput from 'react-otp-input';
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
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  useEffect(() => {
    if (resendTimer > 0 && otpSent) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, otpSent]);

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

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError('OTP must be 6 digits');
    } else if (otp === '123456') {
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
              <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={3} >
                <LockOutlinedIcon sx={{ fontSize: '22px', color: 'black', marginRight: 1 }} />
                <Typography fontSize="17px" fontWeight="bold" color="black" textAlign="center">
                  Login to Admin Portal
                </Typography>
              </Box>

              <form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ pb: 3 }}>
                  <TextField
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    autoComplete="off"
                    size='small'
                    // InputLabelProps={{
                    //   sx: {
                    //     color: 'black',
                    //      top: '-15%',
                    //    },
                    // }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        height: '40px',
                        color: 'black',
                      },
                      // '& .MuiFormHelperText-root': {
                      //   color: 'black',
                      // },
                    }}
                    fullWidth
                  />
                </FormControl>

                <FormControl fullWidth sx={{ pb: 3 }}>
                  <TextField
              label={'Password\u00A0\u00A0'}


                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    autoComplete="off"
                    size='small'
                    // InputLabelProps={{
                    //   sx: {
                       
                    //     color: 'black',
                    //   },
                    // }}
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
                        borderRadius: '10px',
                        height: '40px',
                      },
                      // '& .MuiFormHelperText-root': {
                      //   color: 'black',
                      // },
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
                    borderRadius: '10px',
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
            borderRadius: 6,
            maxWidth: 500,
            width: '100%',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
            }
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box 
              sx={{
                bgcolor: 'rgb(14, 125, 236)',
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: '0 4px 12px rgba(14, 125, 236, 0.3)'
              }}
            >
              <Icon icon="mdi:email-check-outline" style={{ color: 'white', fontSize: '2rem' }} />
            </Box>
            
            <Typography variant="h5" fontWeight="bold" color="text.primary" mb={1}>
              OTP Verification
            </Typography>
            
            <Typography
variant="body2"
color="text.secondary"
textAlign="center"
mb={3}
>
We've sent a 6-digit verification code to{' '}
<Box
  component="span"
  sx={{
    color: 'rgb(14, 125, 236)',
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': { opacity: 0.8 },
  }}
  onClick={() => setOtpSent(false)}
>
  {email}
</Box>
</Typography><Box width="100%" mb={2}>
  <OtpInput
    numInputs={6}
    value={otp}
    onChange={handleOtpChange}
    renderInput={(props) => (
      <input 
        {...props} 
        style={{ 
          width: 'clamp(35px, 8vw, 45px)',
          height: 'clamp(35px, 8vw, 45px)',
          backgroundColor: '#f5f7fa', 
          color: "black", 
          margin: '0 clamp(3px, 1vw, 5px)', 
          textAlign: 'center', 
          fontSize: 'clamp(1rem, 4vw, 1.3rem)', 
          borderRadius: '8px', 
          border: otpError ? '2px solid #f44336' : '1px solid #e0e0e0',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgb(14, 125, 236)';
          e.target.style.boxShadow = '0 0 0 2px rgba(14, 125, 236, 0.2)';
        }}
        onBlur = {(e) => {
          e.target.style.borderColor = otpError ? '#f44336' : '#e0e0e0';
          e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        }}
      />
    )}
    containerStyle={{
      justifyContent: 'center',
      marginBottom: '10px',
      padding: '0 10px'
    }}
  />

  {otpError && (
    <Typography color="error" variant="caption" textAlign="center" display="block" mt={1}>
      {otpError}
    </Typography>
  )}
</Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleOtpSubmit}
              type="submit"
              fullWidth
              sx={{
                bgcolor: 'rgb(66, 74, 84)',
                height: '45px',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '10px',
                fontSize: '1rem',
                textTransform: 'none',
                mb: 1,
                '&:hover': {
                  bgcolor: 'rgb(66, 74, 84)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(128, 130, 133, 0.3)'
                }
              }}
            >
              Verify & Continue
            </Button>

            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
              <Typography
                variant="body2"
                color="rgb(14, 125, 236)"
                sx={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                onClick={() => setOtpSent(false)}
              >
                Change email
              </Typography>
              
              {resendTimer > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Resend OTP in {resendTimer}s
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="rgb(14, 125, 236)"
                  sx={{
                    cursor: 'pointer',
                    fontWeight: '500',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                  onClick={() => {
                    setError('New OTP sent to your email');
                    setOpen(true);
                    setResendTimer(30);
                  }}
                >
                  Resend OTP
                </Typography>
              )}
            </Box>
          </Box>
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