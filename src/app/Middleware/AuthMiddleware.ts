import { verify } from 'jsonwebtoken';
import { Exception } from '@service/Exception';

export const customAuthChecker = ({ root, args, context, info }) => {
  let token = context.token;

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    throw new Exception('Token not found');
  }

  const decoded = verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new Exception('Token invalid!');
  }
  const user_id = decoded.data.id;
  context.user_id = user_id;
  return true;
};
