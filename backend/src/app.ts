import express from 'express';
import cors from 'cors';

import { hospedesRoutes } from './routes/hospedesRoutes';
import { quartosRoutes } from './routes/quartosRoutes';
import { funcionariosRoutes } from './routes/funcionariosRoutes';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API do Hotel Manager está funcionando',
  });
});

app.use('/hospedes', hospedesRoutes);
app.use('/quartos', quartosRoutes);
app.use('/funcionarios', funcionariosRoutes);