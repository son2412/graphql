import { Request, Response } from 'express';
import { Router } from 'express';

const routes = Router();
routes.post('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ test: 1 });
});
export default routes;