import { UserResolver } from './UserResolver';
import { NonEmptyArray } from 'type-graphql';
import { AuthResolver } from './AuthResolver';
import { TestResolver } from './TestResolver';
import { UploadServerResolver } from './UploadServerResolver';
import { UploadS3Resolver } from './UploadS3Resolver';

export const Resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver, TestResolver, UploadServerResolver, UploadS3Resolver];
