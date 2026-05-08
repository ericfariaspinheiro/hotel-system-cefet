import { Grid, Paper, Typography } from '@mui/material';

import {
  funcionariosMock,
  hospedesMock,
  quartosMock,
  reservasMock,
  servicosMock,
} from '../data/mockData';

export function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Hóspedes</Typography>
            <Typography variant="h4">{hospedesMock.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Quartos</Typography>
            <Typography variant="h4">{quartosMock.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Reservas</Typography>
            <Typography variant="h4">{reservasMock.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Funcionários</Typography>
            <Typography variant="h4">{funcionariosMock.length}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Serviços</Typography>
            <Typography variant="h4">{servicosMock.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}