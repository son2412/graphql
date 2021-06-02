import { User } from '@entity/User';

export namespace IContext {
  export type ICtx = {
    token: string;
    user_id: number;
    user: User;
  };
}
