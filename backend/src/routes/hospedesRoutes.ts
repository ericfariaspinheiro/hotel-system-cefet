import { Router } from 'express';

import {
  index,
  remove,
  show,
  store,
  update,
} from '../controllers/hospedesController';

export const hospedesRoutes = Router();

hospedesRoutes.get('/', index);
hospedesRoutes.get('/:id', show);
hospedesRoutes.post('/', store);
hospedesRoutes.put('/:id', update);
hospedesRoutes.delete('/:id', remove);