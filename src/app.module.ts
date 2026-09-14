import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './common/transform-response/transform-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HashingService } from './common/hashing/hashing.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validation';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TaskModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide:APP_INTERCEPTOR,
      useClass:TransformResponseInterceptor
    },
    {
      provide:APP_FILTER,
      useClass:HttpExceptionFilter
    },
    HashingService
  ],
})
export class AppModule {}

// User
//  ├── id
//  ├── name
//  └── email

// Project
//  ├── id
//  ├── name
//  ├── description
//  └── ownerId

// Task
//  ├── id
//  ├── title
//  ├── description
//  ├── status
//  ├── priority
//  ├── projectId
//  └── assigneeId
