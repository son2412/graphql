import { InputType, Field } from 'type-graphql';

@InputType()
export class ParamInput {
  @Field({ nullable: true })
  keyword?: string;

  @Field({ nullable: true })
  pageIndex?: number;

  @Field({ nullable: true })
  pageSize?: number;
}
