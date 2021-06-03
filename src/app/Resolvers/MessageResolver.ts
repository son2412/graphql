import { Message } from '@entity/Message';
import { CreateMessageInput } from '@input/CreateMessageInput';
import { IContext } from '@namespace/IContext';
import { MessageSchema } from '@schema/MessageSchema';
import { Exception } from '@service/Exception';
import { Resolver, Query, Arg, Mutation, Authorized, Ctx, PubSub, PubSubEngine, Subscription, Root } from 'type-graphql';

export interface MessagePayload {
  id?: number;
  sender_id?: number;
  group_id?: number;
  type?: number;
  message?: string;
  created_at?: Date;
  updated_at?: Date;
}
@Resolver()
export class MessageResolver {
  @Mutation(() => Boolean)
  @Authorized(['USER'])
  async message(@PubSub() pubSub: PubSubEngine, @Arg('data') data: CreateMessageInput, @Ctx() ctx: IContext.ICtx): Promise<boolean> {
    const { user } = ctx;
    data = { ...data, ...{ sender_id: user.id } };
    const message = Message.create(data);
    const result = await message.save();
    process.nextTick(async () => await pubSub.publish(`${data.group_id}`, result));
    return true;
  }

  @Subscription({ topics: ({ args }) => args.topic })
  subscriptionMessageToDynamicTopic(@Arg('topic') topic: string, @Root() { id, sender_id, group_id, type, message, created_at, updated_at }: MessagePayload): MessageSchema {
    return { id, sender_id, group_id, type, message, created_at, updated_at };
  }
}
