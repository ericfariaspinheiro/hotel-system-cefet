import { Router } from 'express';

import {
  index,
  remove,
  show,
  store,
  update,
} from '../controllers/reservasController';

export const reservasRoutes = Router();

reservasRoutes.get('/', index);
reservasRoutes.get('/:id', show);
reservasRoutes.post('/', store);
reservasRoutes.put('/:id', update);
reservasRoutes.delete('/:id', remove);