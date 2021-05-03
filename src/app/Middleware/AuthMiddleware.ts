import { verify } from 'jsonwebtoken';
import { Exception } from '@service/Exception';
import { User } from '@entity/User';

export const customAuthChecker = async ({ root, args, context, info }, roles = []) => {
  let token = context.token;
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    throw new Exception('Token not found!', 401, 'Unauthorized');
  }
  const decoded = verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new Exception('Token invalid!', 401, 'Unauthorized');
  }
  if (roles.length && !roles.includes('ADMIN') && !roles.includes('USER')) {
    throw new Exception('Permission Denied!', 403, 'PermissionDenied');
  }
  const user_id = decoded.data.id;
  const user = await User.findOne({ where: { user_id }, relations: ['roles'] });
  context.user_id = user_id;
  context.user = user;
  if (roles.length && roles.includes('ADMIN')) {
    const is_admin = user.roles.find((r) => r.slug === 'admin');
    if (!is_admin) throw new Exception('Permission Denied!', 403, 'PermissionDenied');
    return true;
  }
  if (roles.length && roles.includes('USER')) {
    const is_user = user.roles.find((r) => r.slug === 'user');
    if (!is_user) throw new Exception('Permission Denied!', 403, 'PermissionDenied');
    return true;
  }
  return true;
};
