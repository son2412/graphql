import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { Group } from './Group';

@Entity('user_group')
export class UserGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  user_id: number;

  @Field(() => Number)
  @Column()
  group_id: number;

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

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;
}
