import { UserResolver } from './UserResolver';
import { NonEmptyArray } from 'type-graphql';
import { AuthResolver } from './AuthResolver';
import { TestResolver } from './TestResolver';
import { UploadResolver } from './UploadResolver';

export const Resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver, TestResolver, UploadResolver];
