import { UserGroup } from '@entity/UserGroup';
import { Field, ID, ObjectType } from 'type-graphql';
import { MessageSchema } from './MessageSchema';
import { UserGroupSchema } from './UserGroupSchema';
import { UserSchema } from './UserSchema';

@ObjectType()
export class GroupSchema {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  creator_id: number;

  @Field(() => Number, { nullable: true })
  message_id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => Number)
  type: number;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;

  @Field(() => [UserSchema])
  users: UserSchema[];

  @Field(() => [UserGroupSchema])
  user_group: UserGroup[];

  @Field(() => MessageSchema, { nullable: true })
  message: MessageSchema;
}
