import { FileEntity } from '@entity/index';
import { Exception } from '@service/Exception';
import { Resolver, Query, Arg, Mutation } from 'type-graphql';

@Resolver()
export class UploadResolver {
  @Query(() => [FileEntity])
  uploads() {}

  @Mutation(() => FileEntity!)
  async singleUpload(@Arg('file') file) {}
}
