import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class MessageSchema {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  sender_id: number;

  @Field(() => Number)
  group_id: number;

  @Field(() => String)
  message: string;

  @Field(() => Number)
  type: string;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
