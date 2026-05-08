import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import RoomServiceIcon from '@mui/icons-material/RoomService';

import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Hóspedes', path: '/hospedes', icon: <HotelIcon /> },
  { text: 'Quartos', path: '/quartos', icon: <MeetingRoomIcon /> },
  { text: 'Reservas', path: '/reservas', icon: <CalendarMonthIcon /> },
  { text: 'Funcionários', path: '/funcionarios', icon: <BadgeIcon /> },
  { text: 'Serviços', path: '/servicos', icon: <RoomServiceIcon /> },
];

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Hotel Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />

        <List>
          {menuItems.map(item => (
            <ListItemButton
              key={item.text}
              component={Link}
              to={item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}