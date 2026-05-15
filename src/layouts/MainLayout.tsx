import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import RoomServiceIcon from '@mui/icons-material/RoomService';

import { Link, Outlet, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Overview', path: '/', icon: <DashboardIcon fontSize="small" /> },
  { text: 'Reservations', path: '/reservas', icon: <CalendarMonthIcon fontSize="small" /> },
  { text: 'Guests', path: '/hospedes', icon: <HotelIcon fontSize="small" /> },
  { text: 'Rooms', path: '/quartos', icon: <MeetingRoomIcon fontSize="small" /> },
  { text: 'Staff', path: '/funcionarios', icon: <BadgeIcon fontSize="small" /> },
  { text: 'Services', path: '/servicos', icon: <RoomServiceIcon fontSize="small" /> },
];

export function MainLayout() {
  const location = useLocation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#080D17',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          maxWidth: 1440,
          mx: 'auto',
          minHeight: '100vh',
          backgroundColor: '#0B111D',
          borderLeft: '1px solid #121C2D',
          borderRight: '1px solid #121C2D',
        }}
      >
        <Box
          sx={{
            minHeight: 250,
            px: {
              xs: 3,
              md: 8,
            },
            py: 5,
            background:
              'linear-gradient(135deg, #0B1734 0%, #10296E 55%, #243C96 100%)',
            borderBottom: '1px solid #1D2B4F',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 70% 20%, rgba(96,165,250,0.22), transparent 34%)',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: {
                  xs: 32,
                  md: 48,
                },
              }}
            >
              🏨 Hotel Manager
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.84)',
                fontWeight: 500,
                mb: 1,
              }}
            >
              Sistema Administrativo de Hotel
            </Typography>

            <Typography sx={{ color: 'rgba(255,255,255,0.74)' }}>
              Hóspedes — Reservas — Quartos — Funcionários — Serviços
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 3,
                color: 'rgba(255,255,255,0.56)',
              }}
            >
              Front Office Management Dashboard
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
            backgroundColor: '#090F1A',
            borderBottom: '1px solid #1B2A41',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{
              justifyContent: 'center',
            }}
          >
            {menuItems.map(item => {
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    minHeight: 62,
                    px: 3,
                    borderRadius: 0,
                    color: isActive ? '#60A5FA' : '#AAB4C3',
                    borderBottom: isActive
                      ? '3px solid #3B82F6'
                      : '3px solid transparent',
                    backgroundColor: isActive ? '#111D2F' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#111D2F',
                      color: '#60A5FA',
                    },
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </Stack>
        </Box>

        <Box
          component="main"
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
            py: 5,
            backgroundColor: '#0A111C',
            minHeight: 'calc(100vh - 330px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}