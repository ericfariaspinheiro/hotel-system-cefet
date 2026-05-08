import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import {
  funcionariosMock,
  hospedesMock,
  quartosMock,
  reservasMock,
  servicosMock,
} from '../data/mockData';

const dashboardCards = [
  {
    title: 'Hóspedes',
    description: 'Hóspedes cadastrados',
    value: hospedesMock.length,
    icon: <HotelIcon />,
  },
  {
    title: 'Quartos',
    description: 'Quartos registrados',
    value: quartosMock.length,
    icon: <MeetingRoomIcon />,
  },
  {
    title: 'Reservas',
    description: 'Reservas no sistema',
    value: reservasMock.length,
    icon: <CalendarMonthIcon />,
  },
  {
    title: 'Funcionários',
    description: 'Equipe cadastrada',
    value: funcionariosMock.length,
    icon: <BadgeIcon />,
  },
  {
    title: 'Serviços',
    description: 'Serviços disponíveis',
    value: servicosMock.length,
    icon: <RoomServiceIcon />,
  },
];

export function Dashboard() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Dashboard</Typography>

        <Typography variant="body2" color="text.secondary">
          Acompanhe a visão geral do sistema administrativo do hotel.
        </Typography>
      </Box>

      <Card
        sx={{
          mb: 3,
          background:
            'linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #334155 100%)',
          color: 'white',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction={{
              xs: 'column',
              md: 'row',
            }}
            sx={{
              justifyContent: 'space-between',
              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: '#C8A24A' }}>
                Hotel Manager
              </Typography>

              <Typography variant="h4" sx={{ mb: 1 }}>
                Sistema de gestão hoteleira
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.75)', maxWidth: 560 }}>
                Controle hóspedes, quartos, reservas, funcionários e serviços em
                uma interface administrativa moderna e organizada.
              </Typography>
            </Box>

            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 42, color: '#C8A24A' }} />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {dashboardCards.map(card => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>

                    <Typography variant="h4" sx={{ mt: 1 }}>
                      {card.value}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {card.title}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      backgroundColor: 'rgba(200, 162, 74, 0.14)',
                      color: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {card.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}