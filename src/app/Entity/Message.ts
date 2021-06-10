import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { User } from './User';
import { Group } from './Group';

@Entity('messages')
export class Message extends BaseEntity {
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
  type: number;

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: User;

  @OneToOne(() => Group)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

}
