import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  birth: string;

  @Field({ nullable: true })
  gender: number;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  status: number;

  @Field({ nullable: true })
  deleted_at: Date;

  @Field({ nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  updated_at: Date;
}
