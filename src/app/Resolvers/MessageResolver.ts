import { Group } from '@entity/Group';
import { Message } from '@entity/Message';
import { CreateMessageInput } from '@input/CreateMessageInput';
import { ParamInput } from '@input/ParamInput';
import { IContext } from '@namespace/IContext';
import { PaginateMessage } from '@schema/Common';
import { MessageSchema } from '@schema/MessageSchema';
import { UserSchema } from '@schema/UserSchema';
import { Exception } from '@util/Exception';
import { Resolver, Query, Arg, Mutation, Authorized, Ctx, PubSub, PubSubEngine, Subscription, Root, ID } from 'type-graphql';
import { IsNull } from 'typeorm';

export interface MessagePayload {
  id?: number;
  sender_id?: number;
  group_id?: number;
  type?: number;
  message?: string;
  sent?: boolean;
  created_at?: Date;
  updated_at?: Date;
  sender?: UserSchema;
}
@Resolver()
export class MessageResolver {
  @Mutation(() => Boolean)
  @Authorized(['USER'])
  async message(@PubSub() pubSub: PubSubEngine, @Arg('data') data: CreateMessageInput, @Ctx() ctx: IContext.ICtx): Promise<boolean> {
    const { user } = ctx;
    const group = await Group.findOne({ where: { id: data.group_id, deleted_at: IsNull() }, relations: ['users'] });
    if (!group) throw new Exception('Group Not Found!', 404, 'GroupNotFound');
    data = { ...data, ...{ sender_id: user.id, sent: true } };
    const message = Message.create(data);
    const result = await message.save();
    Object.assign(group, { message_id: result.id });
    await group.save();
    const userIds = group.users.map((user) => user.id).filter((userId) => userId !== user.id);
    process.nextTick(
      async () =>
        await Promise.all([
          pubSub.publish(`group-${data.group_id}`, { ...result, ...{ sender: { id: user.id, avatar: user.avatar } } }),
          userIds.map((id) => pubSub.publish(`user-${id}`, { ...result, ...{ sender: { id: user.id, avatar: user.avatar } } }))
        ])
    );
    return true;
  }

  @Subscription({ topics: ({ args }) => args.topic })
  subscriptionMessageToDynamicTopic(
    @Arg('topic') topic: string,
    @Root() { id, sender_id, group_id, type, message, sent, created_at, updated_at, sender }: MessagePayload
  ): MessageSchema {
    return { id, sender_id, group_id, type, message, sent, created_at, updated_at, sender };
  }

  @Query(() => PaginateMessage)
  @Authorized(['USER'])
  async messages(@Arg('group_id') group_id: number, @Arg('data') data: ParamInput) {
    const pageSize = data.pageSize || 10;
    const pageIndex = data.pageIndex || 1;
    const messages = await Message.findAndCount({
      where: { deleted_at: IsNull(), group_id: group_id },
      relations: ['sender'],
      order: { id: 'DESC' },
      take: pageSize,
      skip: (pageIndex - 1) * pageSize
    });
    return { data: messages[0], totalRow: messages[1], totalPage: Math.ceil(messages[1] / pageSize), currentPage: pageIndex, perPage: pageSize };
  }
}
