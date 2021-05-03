import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity('devices')
@ObjectType()
export class Device {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  user_id: number;

  @Field(() => String)
  @Column()
  token: string;

  @Field(() => String)
  @Column()
  platform: string;

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
