import { Field, ObjectType } from 'type-graphql';
import { UserSchema } from './UserSchema';
@ObjectType()
export class AuthSchema {
  @Field(() => String)
  token: string;

  @Field(() => UserSchema)
  user: UserSchema;
}
