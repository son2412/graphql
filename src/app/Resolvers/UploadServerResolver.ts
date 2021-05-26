import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { Stream } from 'stream';
import { createWriteStream } from 'fs';
import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';

@Resolver()
export class UploadServerResolver {
  @Mutation(() => String)
  async singleUpload(
    @Arg('file', () => GraphQLUpload)
    { createReadStream, filename, mimetype, encoding }: Upload
  ): Promise<string> {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    const file = _.kebabCase(path.basename(filename, path.extname(filename)) + Date.now()) + path.extname(filename);
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `/../../../uploads/${file}`))
        .on('finish', () =>
          resolve(`${process.env.API_URL}/upload/${file}`)
        )
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
