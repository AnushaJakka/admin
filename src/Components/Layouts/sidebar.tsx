import React, { useEffect, useState, useCallback } from 'react';
import {Box,CssBaseline,Divider,Drawer,IconButton,List,ListItemButton,ListItemIcon,ListItemText,Typography,useMediaQuery,useTheme,ThemeProvider,
  createTheme,styled,Tooltip,SwipeableDrawer,} from '@mui/material';
import {Users,ChevronRight,ChevronLeft,Menu as MenuIcon,Home,Settings,Bookmark,FileText,User,X,Bell,} from 'lucide-react';
import { useRouter } from 'next/router';


const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 80;
const TRANSITION_DURATION = 200;

type IconComponent =
  | React.ComponentType<{ size?: number }>
  | React.ComponentType<{ fontSize?: string | number }>;

type NavItem = {
  icon: IconComponent;
  label: string;
  path: string;
  subItems?: NavItem[];
};

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    height: '100vh',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: TRANSITION_DURATION,
    }),
    overflowX: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    borderRight: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
}));

const MobileDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    height: '100vh',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    borderRight: 'none',
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: TRANSITION_DURATION,
    }),
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 64,
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(0, 2),
}));

const CollapseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: -14,
  top: 21,
  backgroundColor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.divider}`,
  width: 28,
  height: 28,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: theme.transitions.create(
    ['background-color', 'transform', 'box-shadow', 'border-color'],
    {
      duration: TRANSITION_DURATION,
      easing: 'ease-out',
    }
  ),
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    color: 'white',
    transform: 'scale(1.15)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderColor: theme.palette.primary.dark,
    '& svg': {
      transform: 'scale(1.1)',
    },
  },
  '& svg': {
    width: 16,
    height: 16,
    transition: theme.transitions.create(['transform', 'color'], {
      duration: TRANSITION_DURATION,
    }),
  },
  zIndex: theme.zIndex.drawer + 1,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '0.5px',
  transition: theme.transitions.create(['opacity', 'width'], {
    duration: TRANSITION_DURATION,
  }),
}));

const MiniLogo = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
  borderRadius: 8,
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  fontWeight: 700,
  fontSize: 14,
  transition: theme.transitions.create(['transform'], {
    duration: TRANSITION_DURATION,
  }),
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const NavMenuItem = React.memo(
  ({
    icon: Icon,
    label,
    isActive = false,
    onClick,
    isCollapsed = false,
    hasSubitems = false,
    isSubitem = false,
  }: {
    icon: IconComponent;
    label: string;
    isActive?: boolean;
    onClick: () => void;
    isCollapsed?: boolean;
    hasSubitems?: boolean;
    isSubitem?: boolean;
  }) => {
    const theme = useTheme();
    const isMuiIcon = (
      Component: IconComponent
    ): Component is React.ComponentType<{ fontSize?: string | number }> => {
      return !!(Component as any).muiName;
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          px: isCollapsed ? 0.5 : 0,
        }}
      >
        <Tooltip title={isCollapsed ? label : ''} placement="right" arrow>
          <ListItemButton
            onClick={onClick}
            sx={{
              borderRadius: 1,
              mb: 0,
              p: isCollapsed ? '10px' : '10px 12px',
              color: isActive ? 'primary.main' : 'text.secondary',
              backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
              transition: theme.transitions.create(
                ['background-color', 'padding', 'transform', 'box-shadow'],
                {
                  duration: TRANSITION_DURATION,
                  easing: 'ease-out',
                }
              ),
              '&:hover': {
                backgroundColor: isActive
                  ? theme.palette.primary.light
                  : theme.palette.action.hover,
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                '& .MuiListItemIcon-root': {
                  transform: 'scale(1.15)',
                  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                },
                '& .MuiTypography-root': {
                  fontWeight: 600,
                },
              },
              flexDirection: isCollapsed ? 'column' : 'row',
              justifyContent: 'center',
              minHeight: 44,
              width: '100%',
              '& .MuiListItemIcon-root': {
                transition: theme.transitions.create(['transform', 'color'], {
                  duration: TRANSITION_DURATION,
                }),
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: 'auto',
                mr: isCollapsed ? 0 : 1.5,
                justifyContent: 'center',
              }}
            >
              {isMuiIcon(Icon) ? (
                <Icon fontSize="small" />
              ) : (
                <Icon size={20} />
              )}
            </ListItemIcon>
            {!isCollapsed && (
              <>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 14,
                    lineHeight: 1.3,
                  }}
                  sx={{
                    my: 0,
                    '& .MuiTypography-root': {
                      transition: theme.transitions.create('opacity', {
                        duration: TRANSITION_DURATION,
                      }),
                    },
                  }}
                />
                {hasSubitems && (
                  <ChevronRight
                    size={16}
                    style={{
                      transform: isActive ? 'rotate(90deg)' : 'none',
                      transition: theme.transitions.create('transform'),
                      marginLeft: 4,
                    }}
                  />
                )}
              </>
            )}
          </ListItemButton>
        </Tooltip>
        {isCollapsed && (
          <Typography
            variant="caption"
            sx={{
              fontSize: 10,
              textAlign: 'center',
              lineHeight: 1.2,
              mb: 1,
              mt: 0.2,
              color: isActive ? 'primary.main' : 'text.secondary',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              px: 0.5,
              transition: theme.transitions.create(['opacity', 'color'], {
                duration: TRANSITION_DURATION,
              }),
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
    );
  }
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8257dc',
      light: 'rgba(130, 87, 220, 0.1)',
      dark: '#6a46c0',
    },
    secondary: { main: '#f97316' },
    background: {
      default: '#0f0f15',
      paper: '#1a1a24',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    action: {
      hover: 'rgba(255, 255, 255, 0.05)',
      selected: 'rgba(130, 87, 220, 0.15)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(130, 87, 220, 0.1)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(130, 87, 220, 0.2)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1a1a24',
          color: 'white',
          fontSize: '0.8rem',
          padding: '8px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
        arrow: {
          color: '#1a1a24',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
});

const CollapsibleLibrary = () => {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activePath, setActivePath] = useState(router.pathname);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/home' },
    {
      icon: FileText,
      label: 'Documents',
      path: '/documents',
      subItems: [
        { icon: FileText, label: 'SubOption 1', path: '/documents/suboption1' },
        { icon: FileText, label: 'SubOption 2', path: '/documents/suboption2' },
      ],
    },
  ];

  const bottomNavItems: NavItem[] = [
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = useCallback(
    (path: string) => {
      try {
        if (router.pathname !== path) {
          router.push(path);
          setActivePath(path);
        }
        if (!isDesktop) setMobileOpen(false);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    },
    [isDesktop, router]
  );

  const toggleSubmenu = useCallback((path: string) => {
    setOpenSubmenu((prev) => (prev === path ? null : path));
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (!isDesktop) setMobileOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [isDesktop, router.events]);

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    if (!isDesktop) {
      setCollapsed(false);
    }
  }, [isDesktop]);

  const renderNavItems = (items: NavItem[], isCollapsed: boolean, isSubitem = false) => {
    return items.map((item) => (
      <React.Fragment key={item.path}>
        <NavMenuItem
          icon={item.icon}
          label={item.label}
          isActive={
            activePath === item.path ||
            (item.subItems && item.subItems.some((sub) => sub.path === activePath))
          }
          onClick={() => {
            if (item.subItems) {
              toggleSubmenu(item.path);
            } else if (router.pathname !== item.path) {
              handleNavigation(item.path);
            } else {
              if (!isDesktop) setMobileOpen(false);
            }
          }}
          isCollapsed={isCollapsed}
          hasSubitems={!!item.subItems}
          isSubitem={isSubitem}
        />
        {item.subItems && openSubmenu === item.path && !isCollapsed && (
          <Box sx={{ pl: isSubitem ? 2 : 1 }}>
            {renderNavItems(item.subItems, isCollapsed, true)}
          </Box>
        )}
      </React.Fragment>
    ));
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'background.paper',
        position: 'relative',
      }}
    >
      <LogoContainer>
        {collapsed ? (
          <MiniLogo>GA</MiniLogo>
        ) : (
          <LogoText variant="h6" color="text.primary">
            Glint Ai 
          </LogoText>
        )}
        {!isDesktop && (
          <IconButton
            onClick={() => setMobileOpen(false)}
            size="small"
            sx={{
              position: 'absolute',
              right: 12,
              color: 'text.secondary',
              transition: theme.transitions.create(['transform'], {
                duration: TRANSITION_DURATION,
              }),
              '&:hover': {
                transform: 'scale(1.1)',
                color: theme.palette.primary.main,
              },
            }}
          >
            <X size={18} />
          </IconButton>
        )}
      </LogoContainer>

      <Divider />

      <List
        sx={{
          px: 1,
          pt: 1,
          flexGrow: 1,
          overflowY: 'auto',
          '& .MuiListItemButton-root': {
            mx: 0.5,
            '&:hover': {
              '& .MuiListItemIcon-root': {
                color: `${theme.palette.primary.main}!important`,
              },
              '& .MuiTypography-root': {
                color: `${theme.palette.primary.main}!important`,
              },
            },
          },
        }}
      >
        {renderNavItems(navItems, collapsed)}
      </List>

      <Box sx={{ pb: 1, flexShrink: 0 }}>
        <Divider sx={{ my: 0.5 }} />
        <List
          sx={{
            px: 1,
            '& .MuiListItemButton-root': {
              mx: 0.5,
              '&:hover': {
                '& .MuiListItemIcon-root': {
                  color: `${theme.palette.primary.main}!important`,
                },
                '& .MuiTypography-root': {
                  color: `${theme.palette.primary.main}!important`,
                },
              },
            },
          }}
        >
          {renderNavItems(bottomNavItems, collapsed)}
        </List>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {isDesktop && (
          <Box sx={{ position: 'relative' }}>
            <StyledDrawer
              variant="permanent"
              sx={{
                width: collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH,
                '& .MuiDrawer-paper': {
                  width: collapsed ? MINI_DRAWER_WIDTH : DRAWER_WIDTH,
                },
              }}
            >
              {drawerContent}
            </StyledDrawer>
            <CollapseButton
              onClick={() => setCollapsed(!collapsed)}
              size="small"
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </CollapseButton>
          </Box>
        )}

        {!isDesktop && (
          <>
            <MobileDrawer
              variant="temporary"
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              onOpen={() => setMobileOpen(true)}
              ModalProps={{
                keepMounted: true, 
              }}
              disableSwipeToOpen={false}
              swipeAreaWidth={20}
            >
              {drawerContent}
            </MobileDrawer>

            {!mobileOpen && (
              <IconButton
                color="inherit"
                onClick={() => setMobileOpen(true)}
                sx={{
                  position: 'fixed',    
                  top: 16,
                  left: 16,
                  zIndex: theme.zIndex.drawer + 1,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: 2,
                  transition: theme.transitions.create(
                    ['background-color', 'transform', 'box-shadow'],
                    {
                      duration: TRANSITION_DURATION,
                    }
                  ),
                  '&:hover': {
                    backgroundColor: theme.palette.background.paper,
                    color: 'white',
                    transform: 'scale(1.1)',
                    boxShadow: 4,
                  },
                }}
              >
                <MenuIcon size={20} />
              </IconButton>
            )}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CollapsibleLibrary;