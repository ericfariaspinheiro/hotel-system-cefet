import { Router } from 'express';

import {
  index,
  remove,
  show,
  store,
  update,
} from '../controllers/quartosController';

export const quartosRoutes = Router();

quartosRoutes.get('/', index);
quartosRoutes.get('/:id', show);
quartosRoutes.post('/', store);
quartosRoutes.put('/:id', update);
quartosRoutes.delete('/:id', remove);