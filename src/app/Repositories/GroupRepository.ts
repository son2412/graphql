import { Group } from '@entity/index';
import { Exception } from '@util/Exception';

export class GroupRepository {
  async index(params) {
    const { user } = params;
    const pageSize = params.pageSize || 10;
    const pageIndex = params.pageIndex || 1;
    const groups = await Group.createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('group.user_group', 'user_group')
      .leftJoinAndSelect('group.message', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .where('user_group.user_id = :user_id', { user_id: user.id })
      .take(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .getManyAndCount();
    return { data: groups[0], totalRow: groups[1], totalPage: Math.ceil(groups[1] / pageSize), currentPage: pageIndex, perPage: pageSize };
  }
}
