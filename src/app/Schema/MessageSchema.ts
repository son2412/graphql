import { Field, ID, ObjectType } from 'type-graphql';
import { UserSchema } from './UserSchema';

@ObjectType()
export class MessageSchema {
  @Field(() => ID, {nullable: true})
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

  @Field(() => UserSchema)
  sender?: UserSchema;
}
