import { Field, ObjectType } from 'type-graphql'
@ObjectType()
export class FileEntity {
  @Field(() => String!)
  filename: string;

  @Field(() => String!)
  mimetype: string;

  @Field(() => String!)
  encoding: string;
}
