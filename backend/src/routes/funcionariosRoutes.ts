import { Router } from 'express';

import {
  index,
  remove,
  show,
  store,
  update,
} from '../controllers/funcionariosController';

export const funcionariosRoutes = Router();

funcionariosRoutes.get('/', index);
funcionariosRoutes.get('/:id', show);
funcionariosRoutes.post('/', store);
funcionariosRoutes.put('/:id', update);
funcionariosRoutes.delete('/:id', remove);