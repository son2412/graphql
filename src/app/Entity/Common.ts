import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class PaginateUser {
  @Field(() => [User])
  data: [User];

  @Field(() => Number)
  totalRow: number;

  @Field(() => Number)
  totalPage: number;

  @Field(() => Number)
  currentPage: number;
}
