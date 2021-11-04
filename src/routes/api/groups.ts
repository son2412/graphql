import { GroupController } from '@controller/index';
import { AuthMiddleware } from '@middleware/AuthMiddleware';
import { Router } from 'express';

const routes = Router();
const controller = new GroupController();

routes.all('*', AuthMiddleware);
routes.get('/', controller.index);

export default routes;
