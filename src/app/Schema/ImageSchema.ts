import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class ImageSchema {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  imageable_id: number;

  @Field(() => String)
  imageable_type: number;

  @Field(() => String)
  url: string;

  @Field(() => String)
  type: number;

  @Field(() => String)
  deleted_at: Date;

  @Field(() => String)
  created_at: Date;

  @Field(() => String)
  updated_at: Date;
}
