import { useEffect, useState } from 'react';

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

import { api } from '../services/api';

import type {
  Funcionario,
  Hospede,
  Quarto,
  Reserva,
  Servico,
} from '../types/hotel';

interface DashboardData {
  hospedes: Hospede[];
  quartos: Quarto[];
  reservas: Reserva[];
  funcionarios: Funcionario[];
  servicos: Servico[];
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData>({
    hospedes: [],
    quartos: [],
    reservas: [],
    funcionarios: [],
    servicos: [],
  });

  const [loading, setLoading] = useState(true);

  async function loadDashboardData() {
    try {
      setLoading(true);

      const [
        hospedesResponse,
        quartosResponse,
        reservasResponse,
        funcionariosResponse,
        servicosResponse,
      ] = await Promise.all([
        api.get('/hospedes'),
        api.get('/quartos'),
        api.get('/reservas'),
        api.get('/funcionarios'),
        api.get('/servicos'),
      ]);

      setData({
        hospedes: hospedesResponse.data,
        quartos: quartosResponse.data,
        reservas: reservasResponse.data,
        funcionarios: funcionariosResponse.data,
        servicos: servicosResponse.data,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalQuartos = data.quartos.length;

  const quartosOcupados = data.quartos.filter(
    quarto => quarto.status === 'Ocupado' || quarto.status === 'Reservado'
  ).length;

  const ocupacao =
    totalQuartos > 0 ? Math.round((quartosOcupados / totalQuartos) * 100) : 0;

  const reservasPendentes = data.reservas.filter(
    reserva => reserva.status === 'Pendente'
  ).length;

  const receitaPrevista = data.reservas.reduce(
    (total, reserva) => total + reserva.valorTotal,
    0
  );

  const servicosDisponiveis = data.servicos.filter(
    servico => servico.disponivel
  ).length;

  const dashboardCards = [
    {
      label: 'Hóspedes',
      value: data.hospedes.length,
      helper: 'cadastros ativos',
      icon: <HotelIcon />,
    },
    {
      label: 'Quartos',
      value: data.quartos.length,
      helper: 'quartos registrados',
      icon: <MeetingRoomIcon />,
    },
    {
      label: 'Reservas',
      value: data.reservas.length,
      helper: 'reservas no sistema',
      icon: <CalendarMonthIcon />,
    },
    {
      label: 'Funcionários',
      value: data.funcionarios.length,
      helper: 'equipe cadastrada',
      icon: <BadgeIcon />,
    },
    {
      label: 'Serviços',
      value: servicosDisponiveis,
      helper: 'serviços disponíveis',
      icon: <RoomServiceIcon />,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        📊 Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 800 }}
              >
                Ocupação atual
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {loading ? '...' : `${ocupacao}%`}
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.78)' }}>
                {quartosOcupados} de {totalQuartos} quartos ocupados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 800 }}
              >
                Receita prevista
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {loading ? '...' : `R$ ${receitaPrevista}`}
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.78)' }}>
                Soma das reservas cadastradas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 800 }}
              >
                Reservas pendentes
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {loading ? '...' : reservasPendentes}
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.78)' }}>
                Aguardando confirmação
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 800 }}
              >
                Serviços ativos
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                {loading ? '...' : servicosDisponiveis}
              </Typography>

              <Typography sx={{ color: 'rgba(255,255,255,0.78)' }}>
                Disponíveis para hóspedes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {dashboardCards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.label}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {card.helper}
                    </Typography>

                    <Typography variant="h3" sx={{ mt: 1 }}>
                      {loading ? '...' : card.value}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {card.label}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: 2,
                      backgroundColor: '#13243A',
                      color: '#60A5FA',
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

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ color: '#60A5FA', mb: 2 }}>
            About This System
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Este painel agora consome os dados reais da API do backend, usando
            os endpoints de hóspedes, quartos, reservas, funcionários e
            serviços.
          </Typography>

          <Typography color="text.secondary">
            Como o backend ainda usa dados em memória, as informações são
            atualizadas durante a execução do servidor, mas voltam ao estado
            inicial quando o backend é reiniciado.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}