import { User } from '@entity/index';

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
