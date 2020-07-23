import { UserResolver } from './UserResolver';
import { NonEmptyArray } from 'type-graphql';
import { AuthResolver } from './AuthResolver';

export const Resolvers: NonEmptyArray<Function> = [UserResolver, AuthResolver];
