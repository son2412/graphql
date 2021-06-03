import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateMessageInput {
  @Field({ nullable: false })
  group_id!: number;

  @Field({ nullable: false })
  message!: string;

  @Field({ defaultValue: 1 })
  type: number;

  @Field({ nullable: true })
  deleted_at: Date;

  @Field({ nullable: true, defaultValue: new Date() })
  created_at: Date;

  @Field({ nullable: true, defaultValue: new Date() })
  updated_at: Date;
}
