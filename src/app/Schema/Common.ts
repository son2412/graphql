import { Field, ID, ObjectType } from 'type-graphql';
import { UserSchema } from './UserSchema';
import { ReadStream } from 'fs';
import { GroupSchema } from './GroupSchema';
import { MessageSchema } from './MessageSchema';

@ObjectType()
export class PaginateUser {
  @Field(() => [UserSchema])
  data: [UserSchema];

  @Field(() => Number)
  totalRow: number;

  @Field(() => Number)
  totalPage: number;

  @Field(() => Number)
  currentPage: number;
}

@ObjectType()
export class Notification {
  @Field((type) => ID)
  id?: number;

  @Field({ nullable: true })
  message?: string;

  @Field((type) => Date)
  date: Date;
}

export interface NotificationPayload {
  id?: number;
  message?: string;
}

@ObjectType()
export class UploadedFileResponse {
  @Field()
  filename: string;

  @Field({ nullable: true })
  mimetype?: string;

  @Field()
  encoding: string;

  @Field()
  url: string;
}

@ObjectType()
export class File {
  @Field()
  filename: string;

  @Field({ nullable: true })
  mimetype?: string;

  @Field()
  encoding?: string;

  @Field()
  stream?: ReadStream;
}

@ObjectType()
export class PaginateGroup {
  @Field(() => [GroupSchema])
  data: [GroupSchema];

  @Field(() => Number)
  totalRow: number;

  @Field(() => Number)
  totalPage: number;

  @Field(() => Number)
  currentPage: number;
}

@ObjectType()
export class PaginateMessage {
  @Field(() => [MessageSchema])
  data: [MessageSchema];

  @Field(() => Number)
  totalRow: number;

  @Field(() => Number)
  totalPage: number;

  @Field(() => Number)
  currentPage: number;
}
