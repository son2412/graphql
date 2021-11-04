import { Router } from 'express';
import webhook from './webhook';
import upload from './upload';
import groups from './groups';

const routes = Router();

routes.use('/webhook', webhook);
routes.use('/upload', upload);
routes.use('/groups', groups);

export default routes;
