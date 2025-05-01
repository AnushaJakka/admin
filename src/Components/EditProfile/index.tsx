//@ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Grid,
  Snackbar,
  Card,
  CardContent,
  MenuItem,
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Image from "next/image";
import profile from "../../../public/assets/profile.jpeg";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Account = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    address: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
 
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [hover, setHover] = useState(false);
  const fileInputRef = useRef(null);
  

  const [emailOtp, setEmailOtp] = useState('');
  const [isEmailOTPSent, setIsEmailOTPSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isPhoneOTPSent, setIsPhoneOTPSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const router = useRouter();
  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const data = {
          first_name: "John",
          last_name: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          date_of_birth: "1990-01-01",
          gender: "male",
          address: "123 Main St, City, Country",
        };

        setUserData(data);
        setOriginalData(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const emailChanged = userData.email !== originalData.email;
  const phoneChanged = userData.phone !== originalData.phone;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...userData, [name]: value };
    setUserData(newData);

    if (name === 'email' && value !== originalData.email) {
      setIsEmailVerified(false);
      setIsEmailOTPSent(false);
      setEmailOtp('');
    }
    if (name === 'phone' && value !== originalData.phone) {
      setIsPhoneVerified(false);
      setIsPhoneOTPSent(false);
      setPhoneOtp('');
    }

    setHasChanges(Object.keys(newData).some(key => originalData[key] !== newData[key]));
  };


  const handleSendEmailOTP = async () => {
    try {
      setUpdating(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEmailOTPSent(true);
      setSuccessMessage("OTP sent to email!");
      setOpenSnackbar(true);
    } catch (error) {
      setErrorMessage("Failed to send OTP");
      setOpenSnackbar(true);
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyEmailOTP = async () => {
    try {
      setUpdating(true);
      if (/^\d{6}$/.test(emailOtp)) {
        setIsEmailVerified(true);
        setSuccessMessage("Email verified!");
        setOpenSnackbar(true);
      } else {
        setErrorMessage("Please enter a valid 6-digit OTP");
        setOpenSnackbar(true);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleSendPhoneOTP = async () => {
    try {
      setUpdating(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsPhoneOTPSent(true);
      setSuccessMessage("OTP sent to phone!");
      setOpenSnackbar(true);
    } catch (error) {
      setErrorMessage("Failed to send OTP");
      setOpenSnackbar(true);
    } finally {
      setUpdating(false);
    }
  };

  const handleVerifyPhoneOTP = async () => {
    try {
      setUpdating(true);
      if (/^\d{6}$/.test(phoneOtp)) {
        setIsPhoneVerified(true);
        setSuccessMessage("Phone verified!");
        setOpenSnackbar(true);
      } else {
        setErrorMessage("Please enter a valid 6-digit OTP");
        setOpenSnackbar(true);
      }
    } finally {
      setUpdating(false);
    }
  };


  const handleImageClick = () => {
    if (isEditing) fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setHasChanges(true);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setPreviewImage(null);
    setHasChanges(true);
  };

 
  const handleEditToggle = () => {
    if (isEditing) {
      setUserData(originalData);
      setPreviewImage(profileImage ? previewImage : null);
      [setIsEmailOTPSent, setIsEmailVerified, setIsPhoneOTPSent, setIsPhoneVerified].forEach(fn => fn(false));
      setEmailOtp('');
      setPhoneOtp('');
    }
    setIsEditing(!isEditing);
    setHasChanges(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ((emailChanged && !isEmailVerified) || (phoneChanged && !isPhoneVerified)) {
      setErrorMessage("Please verify all modified contact information before saving");
      setOpenSnackbar(true);
      return;
    }

    setUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage("Profile updated successfully!");
      setOpenSnackbar(true);
      setOriginalData(userData);
      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      setErrorMessage("Update failed. Please try again.");
      setOpenSnackbar(true);
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} sx={{ 
      p: { xs: 1, sm: 3 },
      maxWidth: 'xl',
      margin: '0 auto'
    }}>
      <Grid size={{xs:12,md:4}}>
        <Card sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
          '&:hover': { boxShadow: 6 },
          transition: 'box-shadow 0.3s ease',
        }}>
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Stack spacing={2} alignItems="center">  
              <Box 
                sx={{ 
                  position: 'relative',
                  cursor: isEditing ? 'pointer' : 'default',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: 200,
                  height: 200,
                  border: '2px solid',
                  borderColor: 'divider'
                }}
                onClick={handleImageClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Image
                  src={previewImage || profile}
                  alt="Profile"
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover' }}
                  priority
                />
                {isEditing && hover && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CameraAltIcon sx={{ color: 'white', fontSize: 40 }} />
                  </Box>
                )}
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
              <Typography variant="h5" component="div" textAlign="center">
                {`${userData.first_name} ${userData.last_name}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.email}
              </Typography>
              <Stack spacing={2} width="100%">
                <Button 
                  variant="contained" 
                  color="error" 
                  fullWidth
                  onClick={isEditing ? handleDeleteImage : () => console.log("Delete user")}
                >
                  {isEditing ? "Delete Image" : "Delete Account"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    Cookies.remove('access_token');
                    router.push('/');
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{xs:12,md:8}}>
        <Card sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
          '&:hover': { boxShadow: 6 },
          transition: 'box-shadow 0.3s ease',
        }}>
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}  > 
                <Grid container spacing={1}>
                  <Grid size={{xs:12,sm:6}}>
                    <TextField
                      label="First Name"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleChange}
                      fullWidth
                      required
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid size={{xs:12,sm:6}}>
                    <TextField
                      label="Last Name"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleChange}
                      fullWidth
                      required
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid size={{xs:12,sm:6}}>
                    <Box>
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />
                      {isEditing && emailChanged && (
                        <Box sx={{ mt: 1 }}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={8}>
                              <TextField
                                label="Email OTP"
                                value={emailOtp}
                                onChange={(e) => setEmailOtp(e.target.value)}
                                fullWidth
                                disabled={!isEmailOTPSent}
                                inputProps={{ maxLength: 6 }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                onClick={isEmailOTPSent ? handleVerifyEmailOTP : handleSendEmailOTP}
                                disabled={updating}
                                fullWidth
                                sx={{ height: '56px' }}
                              >
                                {isEmailOTPSent ? 'Verify' : 'Send OTP'}
                              </Button>
                            </Grid>
                          </Grid>
                          {isEmailVerified && (
                            <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
                              ✓ Email verified
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                  <Grid size={{xs:12,sm:6}}>
                    <Box>
                      <TextField
                        label="Phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />
                      {isEditing && phoneChanged && (
                        <Box sx={{ mt: 1 }}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={8}>
                              <TextField
                                label="Phone OTP"
                                value={phoneOtp}
                                onChange={(e) => setPhoneOtp(e.target.value)}
                                fullWidth
                                disabled={!isPhoneOTPSent}
                                inputProps={{ maxLength: 6 }}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                onClick={isPhoneOTPSent ? handleVerifyPhoneOTP : handleSendPhoneOTP}
                                disabled={updating}
                                fullWidth
                                sx={{ height: '56px' }}
                              >
                                {isPhoneOTPSent ? 'Verify' : 'Send OTP'}
                              </Button>
                            </Grid>
                          </Grid>
                          {isPhoneVerified && (
                            <Typography variant="caption" color="success.main" sx={{ mt: 1 }}>
                              ✓ Phone verified
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid size={{xs:12,sm:6}}>
                    <TextField
                      label="Date of Birth"
                      name="date_of_birth"
                      type="date"
                      value={userData.date_of_birth}
                      onChange={handleChange}
                      fullWidth
                      required
                      disabled={!isEditing}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid size={{xs:12,sm:6}}>
                    <TextField
                      select
                      label="Gender"
                      name="gender"
                      value={userData.gender}
                      onChange={handleChange}
                      fullWidth
                      required
                      disabled={!isEditing}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Grid size={12} >
                <TextField
                  label="Address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  required
                  disabled={!isEditing}
                />
                </Grid>
                   </Stack>

                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt:2,
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'stretch' : 'center'
                }}>
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={handleEditToggle}
                      sx={{ 
                        minWidth: isMobile ? '100%' : 150,
                        order: isMobile ? 1 : 0
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        
                        disabled={
                          updating || 
                          !hasChanges ||
                          (emailChanged && !isEmailVerified) ||
                          (phoneChanged && !isPhoneVerified)
                        }
                        sx={{ 
                          minWidth: isMobile ? '100%' : 150,
                          order: isMobile ? 1 : 2
                        }}
                      >
                        {updating ? <CircularProgress size={24} /> : "Save Changes"}
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleEditToggle}

                        sx={{ 
                          minWidth: isMobile ? '100%' : 120,
                          order: isMobile ? 2 : 1,
                          mt:{xs:2,md:0},
                          mr:{md:2}
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Box>

            </form>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={successMessage ? "success" : "error"} 
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Account;