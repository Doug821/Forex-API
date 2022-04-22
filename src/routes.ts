import { Router } from 'express';
import ExchangeController from './app/controllers/ExchangeController';

const router = Router();

router.get('/exchanges', ExchangeController.index);
router.delete('/exchanges/:id', ExchangeController.delete);
router.post('/exchanges/', ExchangeController.store);

export default router;
