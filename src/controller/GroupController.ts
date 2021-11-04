import { Request, Response } from 'express';
import { GroupService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import * as Joi from '@hapi/joi';

const service = new GroupService();
export class GroupController {
  async index(req: Request, res: Response) {
    const { query, user } = req;
    const valid = Joi.object({
      pageIndex: Joi.number(),
      pageSize: Joi.number()
    });
    const { error, value } = valid.validate(query);
    if (error) {
      return res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400, errorText: 'InvalidInput' }));
    }
    try {
      const result = await service.index({ ...value, ...{ user } });
      return res.json(ApiRespone.paginate(result));
    } catch (err) {
      return res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
