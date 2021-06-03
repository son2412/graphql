import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Field, ID } from 'type-graphql';
import { User } from './User';
import { UserGroup } from './UserGroup';

@Entity('groups')
export class Group extends BaseEntity {
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
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_group',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id'
    }
  })
  @Field(() => [User])
  users: User[];

  @OneToMany(
    () => UserGroup,
    ug => ug.group
  )
  user_group: UserGroup[];
}
