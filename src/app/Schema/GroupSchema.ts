import { Field, ID, ObjectType } from 'type-graphql';

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
}
