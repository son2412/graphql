import { UserResolver } from './UserResolver';
import { NonEmptyArray } from 'type-graphql';
import { AuthResolver } from './AuthResolver';
import { TestResolver } from './TestResolver';

export const Resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver, TestResolver];
