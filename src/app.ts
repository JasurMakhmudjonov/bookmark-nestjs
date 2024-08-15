import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TodosModule,
    AuthModule,
    CacheModule.register({
      ttl: 60000,
      isGlobal: true,
    }),
    UploadModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
