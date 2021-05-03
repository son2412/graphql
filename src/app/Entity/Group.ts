import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity('groups')
@ObjectType()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  creator_id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  avatar: string;

  @Field(() => Number)
  @Column()
  type: number;

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
