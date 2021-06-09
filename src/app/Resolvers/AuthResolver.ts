import { User } from '@entity/index';
import { Exception } from '@service/Exception';
import { Resolver, Arg, Mutation } from 'type-graphql';
import { CreateUserInput } from '@input/CreateUserInput';
import { Auth } from '@service/Auth';
import { AuthSchema } from '@schema/AuthSchema';
import { IsNull } from 'typeorm';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthSchema)
  async signIn(@Arg('email') email: string, @Arg('password') password: string) {
    const user = await User.findOne({ where: { email: email, deleted_at: IsNull() } });
    if (!user) throw new Exception('User not found!');
    const isValidPassword = Auth.check(password, user.password);
    if (isValidPassword === false) {
      throw new Exception('Password not match', 1001);
    }
    return { token: Auth.generateToken(user), user: user };
  }

  @Mutation(() => AuthSchema)
  async signUp(@Arg('data') data: CreateUserInput) {
    const user = await User.findOne({ where: { email: data.email, deleted_at: IsNull() } });
    if (user) throw new Exception('User is existing !');
    data = { ...data, ...{ password: Auth.hash(data.password), created_at: new Date(), updated_at: new Date() } };
    const result = User.create(data);
    await result.save();
    return { token: Auth.generateToken(result), user: result };
  }
}
