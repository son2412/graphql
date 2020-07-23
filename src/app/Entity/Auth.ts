import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User';
@ObjectType()
export class AuthEntity {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
