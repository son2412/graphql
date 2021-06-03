import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class MessageSchema {
  @Field(() => ID)
  id?: number;

  @Field(() => Number)
  sender_id?: number;

  @Field(() => Number)
  group_id?: number;

  @Field(() => String)
  message?: string;

  @Field(() => Number)
  type?: number;

  @Field(() => Date)
  deleted_at?: Date;

  @Field(() => Date)
  created_at?: Date;

  @Field(() => Date)
  updated_at?: Date;
}
