import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserGroupSchema {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  user_id: number;

  @Field(() => Number)
  group_id: number;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
