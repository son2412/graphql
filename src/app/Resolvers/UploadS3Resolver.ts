import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import * as AWS from 'aws-sdk';
import * as stream from 'stream';
import { ApolloServerFileUploads } from '@namespace/ApolloServerFileUploads';
import { UploadedFileResponse, File } from '@entity/Common';
import { GraphQLUpload } from 'graphql-upload';
/**
 * github: https://github.com/stemmlerjs/apollo-cloud-file-uploads
 */
type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
  destinationBucketName: string;
};

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

@Resolver()
export class UploadS3Resolver implements ApolloServerFileUploads.IUploader {
  private s3: AWS.S3;
  public destinationBucketName: string;

  constructor() {
    // AWS.config = new AWS.Config();
    AWS.config.update({
      region: process.env.S3_REGION,
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    });
    this.s3 = new AWS.S3();
    this.destinationBucketName = process.env.S3_BUCKET_NAME;
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.destinationBucketName,
          Key: key,
          Body: pass
        })
        .promise()
    };
  }

  private createDestinationFilePath(fileName: string, mimetype: string, encoding: string): string {
    return fileName;
  }

  @Mutation(() => UploadedFileResponse!)
  async singleFileUploadResolver(@Arg('file', () => GraphQLUpload) file): Promise<ApolloServerFileUploads.UploadedFileResponse> {
    console.log(file);
    const { filename, mimetype, encoding, createReadStream } = await file;
    const filePath = this.createDestinationFilePath(filename, mimetype, encoding);
    const uploadStream = this.createUploadStream(filePath);
    
    createReadStream().pipe(uploadStream.writeStream);
    const result = await uploadStream.promise;

    return { filename, mimetype, encoding, url: result.Location };
  }

  @Mutation(() => [UploadedFileResponse!]!)
  async multipleUploadsResolver(@Arg('files', () => GraphQLUpload) files): Promise<ApolloServerFileUploads.UploadedFileResponse[]> {
    return Promise.all(files.map((f) => this.singleFileUploadResolver(f)));
  }
}
