import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  first_name: string;

  @Field({ nullable: false })
  last_name: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: false })
  phone: string;

  @Field({ nullable: false })
  birth: string;

  @Field({ nullable: false })
  gender: number;

  @Field({ nullable: false })
  password: string;

  @Field({ defaultValue: 1 })
  status: number;

  @Field({ nullable: true })
  deleted_at: Date;

  @Field({ nullable: true, defaultValue: new Date() })
  created_at: Date;

  @Field({ nullable: true, defaultValue: new Date() })
  updated_at: Date;
}
