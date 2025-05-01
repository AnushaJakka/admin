import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Box, 
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

 
  const firstRowHeight = isMobile ? 'auto' : '250px';

  const carouselItems = [
    { 
      image: '/image.png', 
      alt: 'Featured content 1',
      title: 'Understanding Blockchain Technology',
      description: 'Learn about the latest trends in blockchain development',
      tag: 'FEATURED APP',
      color: '#6366F1'
    },
    { 
      image: '/image1.jpeg',
      alt: 'Featured content 2',
      title: 'Advanced React Patterns',
      description: 'Master modern React techniques for better apps',
      tag: 'POPULAR',
      color: '#EC4899'
    },
    { 
      image: 'image2.jpeg', 
      alt: 'Featured content 3',
      title: 'UI/UX Design Principles',
      description: 'Essential design concepts for developers',
      tag: 'TRENDING',
      color: '#14B8A6'
    }
  ];

  const statsData = [
    { title: 'Total active users', value: '18,765', trend: '+2.6%', positive: true },
    { title: 'Total installed', value: '4,876', trend: '+0.2%', positive: true },
    { title: 'Total downloads', value: '678', trend: '-0.1%', positive: false }
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={{xs:12,md:8}}>
        <Card sx={{ 
          backgroundColor: '#1E293B',
          color: 'white', 
          borderRadius: '12px',
          height: firstRowHeight,
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
          }
        }}>
          <Box sx={{ 
            p: isMobile ? 3 : 4,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
            position: 'relative',
            zIndex: 1
          }}>
            <Typography variant="h6" fontWeight="bold">Welcome back 👋</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
              Jaydon Frankie
            </Typography>
            <Typography variant='body1' sx={{ mb: 3, maxWidth: '500px' }}>
              If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.
            </Typography>
            <Button 
              variant="contained" 
              color='primary'
              sx={{ 
                backgroundColor: '#0b521e',
                borderRadius: '8px',
                width: isMobile ? '100%' : 'fit-content',
                '&:hover': { 
                  backgroundColor: '#15803D',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                },
                textTransform: 'none',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              Go now
            </Button>
          </Box>
          <Box sx={{
            flex: 1,
            position: 'relative',
            minHeight: isMobile ? '200px' : 'auto',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isMobile 
                ? 'linear-gradient(to bottom, rgba(30, 41, 59, 0.8) 0%, transparent 100%)' 
                : 'linear-gradient(to right, rgba(30, 41, 59, 0.8) 0%, transparent 100%)',
              zIndex: 1
            }
          }}>
            <img 
              src="card-1.png" 
              alt="Dashboard"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: isMobile ? '12px 12px 0 0' : '0 12px 12px 0'
              }}
            />
          </Box>
        </Card>
      </Grid>

     
      <Grid size={{xs:12,md:4}}>
        <Card sx={{ 
          height: firstRowHeight,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
          }
        }}>
          <Carousel
            autoPlay={true}
            interval={5000}
            animation="fade"
            duration={800}
            navButtonsAlwaysVisible={!isMobile}
            indicators={!isMobile}
            sx={{ 
              height: '100%',
              '& .MuiButtonBase-root': {   
                backgroundColor: 'transparent',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'transparent', 
                }
              },
              '& .Carousel-indicators': {
                bottom: '10px',
                '& button': {
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  width: isMobile ? 6 : 8,
                  height: isMobile ? 3 : 4,
                  margin: '0 4px',
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                  '&.active': {
                    backgroundColor: 'white',
                    width: '12px'
                  }
                }
              },
              '& .CarouselButton': {
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.5)'
                }
              }
            }}
            onChange={(index?: number) => setActiveCarouselIndex(index || 0)}
          >
            {carouselItems.map((item, i) => (
              <Box 
                key={i} 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: firstRowHeight,
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={item.image}
                  alt={item.alt}
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }} 
                />
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)`,
                }} />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: isMobile ? 2 : 3,
                  color: 'white',
                }}>
                  <Fade in={activeCarouselIndex === i} timeout={800}>
                    <div>
                      <Chip 
                        label={item.tag} 
                        size="small" 
                        sx={{ 
                          backgroundColor: item.color,
                          color: 'white',
                          mb: 1,
                          fontWeight: 'bold',
                        }} 
                      />
                      <Typography 
                        variant={isMobile ? 'subtitle1' : 'h6'} 
                        fontWeight="bold" 
                        sx={{ mb: 1 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography 
                        variant={isMobile ? 'caption' : 'body2'} 
                        sx={{ opacity: 0.9 }}
                      >
                        {item.description}
                      </Typography>
                    </div>
                  </Fade>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Card>
      </Grid>

     
      {statsData.map((stat, index) => (
        <Grid  size={{xs:12,sm:12,md:4}} key={index}>
          <Card sx={{ 
            borderRadius: '12px',
            height: '100%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
              backgroundColor: theme.palette.background.paper
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexDirection: 'row',
                textAlign: 'left'
              }}>
                <Box sx={{ mb: 0 }}>
                  <Typography color='#211f1f' gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color='#211f1f' sx={{ mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                    {stat.positive ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
                        <path d="M5 17.75a.75.75 0 0 1-.488-1.32l7-6a.75.75 0 0 1 .976 0l7 6A.75.75 0 0 1 19 17.75z" fill="#34eb61" opacity="0.4"/>
                        <path d="M4.43 13.488a.75.75 0 0 0 1.058.081L12 7.988l6.512 5.581a.75.75 0 1 0 .976-1.138l-7-6a.75.75 0 0 0-.976 0l-7 6a.75.75 0 0 0-.081 1.057" fill="#34eb61" fillRule="evenodd" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '4px' }}>
                        <path d="M5 6.25a.75.75 0 0 0-.488 1.32l7 6c.28.24.695.24.976 0l7-6A.75.75 0 0 0 19 6.25z" fill="#eb4034" opacity="0.4"/>
                        <path d="M4.43 10.512a.75.75 0 0 1 1.058-.081L12 16.012l6.512-5.581a.75.75 0 1 1 .976 1.139l-7 6a.75.75 0 0 1-.976 0l-7-6a.75.75 0 0 1-.081-1.058" fill="#eb4034" fillRule="evenodd" clipRule="evenodd"/>
                      </svg>
                    )}
                    <Typography 
                      variant="body2" 
                      color={stat.positive ? 'success.main' : 'error.main'} 
                      fontWeight="medium"
                    >
                      {stat.trend} last 7 days
                    </Typography>
                  </Box>
                </Box>
                <Box 
                  component="img" 
                  src={stat.positive ? "/statistics.png" : "/decrease.png"} 
                  alt={stat.positive ? "Increasing trend" : "Decreasing trend"}
                  sx={{ 
                    width: 60, 
                    height: 60,
                    ml: 2
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;