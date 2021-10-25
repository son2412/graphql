import { Group } from '@entity/Group';
import { ParamInput } from '@input/ParamInput';
import { IContext } from '@namespace/IContext';
import { PaginateGroup } from '@schema/Common';
import { GroupSchema } from '@schema/GroupSchema';
import { Agora, PUBLISHER } from '@service/Agora';
import { Exception } from '@service/Exception';
import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from 'type-graphql';

@Resolver()
export class GroupResolver {
  @Query(() => PaginateGroup)
  @Authorized(['USER'])
  async groups(@Arg('data') data: ParamInput, @Ctx() ctx: IContext.ICtx) {
    const { user } = ctx;
    const pageSize = data.pageSize || 10;
    const pageIndex = data.pageIndex || 1;
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

  @Query(() => GroupSchema)
  @Authorized(['USER'])
  async group(@Arg('id') id: number) {
    const group = await Group.createQueryBuilder('group').leftJoinAndSelect('group.users', 'users').where('group.id = :id', { id }).getOne();
    if (!group) throw new Exception('Group Not Found!', 404, 'GroupNotFound');
    return group;
  }

  @Mutation(() => GroupSchema)
  @Authorized(['USER'])
  async makeToken(@Arg('id') id: number) {
    const group = await Group.createQueryBuilder('group').where('group.id = :id', { id }).getOne();
    if (!group) throw new Exception('Group Not Found!', 404, 'GroupNotFound');
    const token = Agora.generateToken({ chanelName: `${id}`, role: PUBLISHER });
    group.token = token;
    await group.save();
    return group;
  }
}
