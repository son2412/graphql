import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql'

@Entity('images')
@ObjectType()
export class Image {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  imageable_id: number;

  @Field(() => String)
  @Column()
  imageable_type: number;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
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
