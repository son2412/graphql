import { Group } from '@entity/Group';
import { ParamInput } from '@input/ParamInput';
import { IContext } from '@namespace/IContext';
import { PaginateGroup } from '@schema/Common';
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
    // const groups = 
    const groups = await Group.findAndCount({ take: pageSize, skip: (pageIndex - 1) * pageSize });
    return { data: groups[0], totalRow: groups[1], totalPage: Math.ceil(groups[1] / pageSize), currentPage: pageIndex, perPage: pageSize };
  }
}
