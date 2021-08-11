import { Router } from 'express';
import webhook from './webhook';
import upload from './upload';

const routes = Router();

routes.use('/webhook', webhook);
routes.use('/upload', upload);
export default routes;
