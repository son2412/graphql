import { Router } from 'express';
import webhook from './webhook';

const routes = Router();

routes.use('/webhook', webhook);
export default routes;
