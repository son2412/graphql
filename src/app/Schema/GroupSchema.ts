import { UserGroup } from '@entity/UserGroup';
import { Field, ID, ObjectType } from 'type-graphql';
import { UserGroupSchema } from './UserGroupSchema';
import { UserSchema } from './UserSchema';

@ObjectType()
export class GroupSchema {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  creator_id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  avatar: string;

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
}
