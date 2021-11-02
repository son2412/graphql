import { User } from '@entity/index';
import { Exception } from '@util/Exception';
import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from 'type-graphql';
import { CreateUserInput } from '@input/CreateUserInput';
import { UpdateUserInput } from '@input/UpdateUserInput';
import { PaginateUser } from '@schema/Common';
import { ParamInput } from '@input/ParamInput';
import { UserSchema } from '@schema/UserSchema';
import { IContext } from '@namespace/IContext';
import { IsNull, Not } from 'typeorm';

@Resolver()
export class UserResolver {
  @Query(() => PaginateUser)
  async users(@Arg('data') data: ParamInput) {
    const pageSize = data.pageSize || 10;
    const pageIndex = data.pageIndex || 1;
    const users = await User.findAndCount({
      where: { deleted_at: IsNull() },
      relations: ['roles'],
      take: pageSize,
      skip: (pageIndex - 1) * pageSize
    });
    return { data: users[0], totalRow: users[1], totalPage: Math.ceil(users[1] / pageSize), currentPage: pageIndex, perPage: pageSize };
  }

  @Query(() => UserSchema)
  user(@Arg('id') id: number) {
    return User.findOne({ where: { id, deleted_at: IsNull() }, relations: ['roles'] });
  }

  @Query(() => UserSchema)
  @Authorized([])
  me(@Ctx() ctx: IContext.ICtx) {
    const { user_id } = ctx;
    return User.findOne({ where: { id: user_id, deleted_at: IsNull() }, relations: ['roles'] });
  }

  @Mutation(() => Boolean)
  async createUser(@Arg('data') data: CreateUserInput) {
    const user = User.create(data);
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  async updateUser(@Arg('id') id: number, @Arg('data') data?: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Exception('User not found!');
    Object.assign(user, data);
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number) {
    const user = await User.findOne({ where: { id, deleted_at: IsNull() } });
    if (!user) throw new Exception('User not found!', 404);
    await user.remove();
    return true;
  }
}
