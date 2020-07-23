import { PrimaryGeneratedColumn, Column, BaseEntity, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql'
import { Role } from './Role';

@Entity('users')
@ObjectType()
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
  phone: string;

  @Field(() => String)
  @Column()
  birth: string;

  @Field(() => Number)
  @Column()
  gender: number;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Number)
  @Column()
  status: number;

  @Field(() => String)
  @Column()
  deleted_at: Date;

  @Field(() => String)
  @Column()
  created_at: Date;

  @Field(() => String)
  @Column()
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
}
