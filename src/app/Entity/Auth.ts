import { Field, ObjectType } from 'type-graphql';
import { User } from './User';
@ObjectType()
export class AuthEntity {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
