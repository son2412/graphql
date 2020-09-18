import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';

@Resolver()
export class UploadServerResolver {
  @Mutation(() => Boolean)
  async singleUpload(
    @Arg('file', () => GraphQLUpload)
    { createReadStream, filename }: Upload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    );
  }
}

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
