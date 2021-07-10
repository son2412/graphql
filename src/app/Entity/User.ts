import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToMany, JoinTable, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { Role } from './Role';
import { Group } from './Group';
import { Message } from './Message';

@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  first_name: string;

  @Field(() => String)
  @Column()
  last_name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  avatar: string;

  @Field(() => String)
  @Column()
  phone: string;

  @Field(() => String)
  @Column()
  birthday: string;

  @Field(() => Number)
  @Column()
  gender: number;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String)
  @Column()
  social_id: string;

  @Field(() => Number)
  @Column()
  login_type: number;

  @Field(() => Number)
  @Column()
  status: number;

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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id'
    }
  })
  @Field(() => [Role])
  roles: Role[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    }
  })
  @Field(() => [Group])
  groups: Group[];

  @OneToMany(() => Message, (m) => m.sender)
  messages: Message[];
}
