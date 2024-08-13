import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  exports: [UploadController],
  providers: [UploadController],
})
export class UploadModule {}
