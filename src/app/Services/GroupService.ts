import { GroupRepository } from '@repository/index';

const groupRepository = new GroupRepository();
export class GroupService {
  async index(params) {
    const groups = await groupRepository.index(params);
    return groups;
  }
}
