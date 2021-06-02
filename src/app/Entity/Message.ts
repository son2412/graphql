import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';

@Entity('messages')
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
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
