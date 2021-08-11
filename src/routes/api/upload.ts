import { FileStorage } from '@service/FileStorage';
import { Request, Response } from 'express';
import { Router } from 'express';

const routes = Router();
routes.post('/', uploadS3);
async function uploadS3(req: Request, res: Response) {
  const service = new FileStorage();

  const upload: any = await service.typeFile('image').typeFile('video').typeFile('application').limitFileUpload(5).uploadMultiFile('files');

  upload(req, res, function (error) {
    if (error) {
      res.status(500);
      res.json({ data: error.message, error_code: 1000 });
    } else {
      res.json(req['files']);
    }
  });
}
export default routes;
