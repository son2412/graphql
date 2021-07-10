import { Field, ID, ObjectType } from 'type-graphql';
import { RoleSchema } from './RoleSchema';

@ObjectType()
export class UserSchema {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatar: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  birthday: string;

  @Field(() => Number)
  gender: number;

  // @Field(() => String)
  // password: string;

  @Field(() => Number)
  status: number;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;

  @Field(() => [RoleSchema])
  roles: RoleSchema[];
}
