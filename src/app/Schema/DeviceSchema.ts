import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class DeviceSchema {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  user_id: number;

  @Field(() => String)
  token: string;

  @Field(() => String)
  platform: string;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
