import { Router } from 'express';

import {
  index,
  remove,
  show,
  store,
  update,
} from '../controllers/servicosController';

export const servicosRoutes = Router();

servicosRoutes.get('/', index);
servicosRoutes.get('/:id', show);
servicosRoutes.post('/', store);
servicosRoutes.put('/:id', update);
servicosRoutes.delete('/:id', remove);