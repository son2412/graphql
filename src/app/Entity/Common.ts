import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User';
import { ReadStream } from 'fs';

@ObjectType()
export class PaginateUser {
  @Field(() => [User])
  data: [User];

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
  id: number;

  @Field({ nullable: true })
  message?: string;

  @Field((type) => Date)
  date: Date;
}

export interface NotificationPayload {
  id: number;
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
