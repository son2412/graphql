import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity('messages')
@ObjectType()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  sender_id: number;

  @Field(() => Number)
  @Column()
  group_id: number;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => Number)
  @Column()
  type: string;

  @Field(() => String)
  @Column()
  deleted_at: Date;

  @Field(() => String)
  @Column()
  created_at: Date;

  @Field(() => String)
  @Column()
  updated_at: Date;
}
