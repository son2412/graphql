import { Field, ID, ObjectType } from 'type-graphql';
import { UserSchema } from './UserSchema';

@ObjectType()
export class RoleSchema {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;

  @Field(() => [UserSchema])
  users: UserSchema[];
}
