import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import RoomServiceIcon from '@mui/icons-material/RoomService';

import { Link, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Hóspedes', path: '/hospedes', icon: <HotelIcon /> },
  { text: 'Quartos', path: '/quartos', icon: <MeetingRoomIcon /> },
  { text: 'Reservas', path: '/reservas', icon: <CalendarMonthIcon /> },
  { text: 'Funcionários', path: '/funcionarios', icon: <BadgeIcon /> },
  { text: 'Serviços', path: '/servicos', icon: <RoomServiceIcon /> },
];

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  function handleToggleDrawer() {
    setMobileOpen(currentValue => !currentValue);
  }

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'primary.main',
        color: 'white',
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: '0 !important',
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            backgroundColor: 'secondary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
            fontWeight: 800,
          }}
        >
          H
        </Box>

        <Box>
          <Typography variant="h6" sx={{ lineHeight: 1 }}>
            Hotel Manager
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>
            Sistema administrativo
          </Typography>
        </Box>
      </Toolbar>

      <List sx={{ mt: 2 }}>
        {menuItems.map(item => {
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              sx={{
                mb: 1,
                borderRadius: 3,
                color: isActive ? 'primary.main' : 'rgba(255,255,255,0.75)',
                backgroundColor: isActive ? 'secondary.main' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive
                    ? 'secondary.main'
                    : 'rgba(255,255,255,0.08)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? 'primary.main' : 'rgba(255,255,255,0.75)',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                slotProps={{
                  primary: {
                    sx: { fontWeight: isActive ? 700 : 500 }
                  }
                }}
              />

            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            sm: `${drawerWidth}px`,
          },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleToggleDrawer}
              sx={{
                mr: 2,
                display: {
                  sm: 'none',
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Painel administrativo
              </Typography>
              <Typography variant="h6">Gerenciamento do Hotel</Typography>
            </Box>
          </Box>

          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 38,
              height: 38,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            AD
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: {
            sm: drawerWidth,
          },
          flexShrink: {
            sm: 0,
          },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleToggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: 'block',
              sm: 'none',
            },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: 'none',
              sm: 'block',
            },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          p: {
            xs: 2,
            sm: 4,
          },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}