import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './common/transform-response/transform-response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'karel',
      password: '12345678',
      database: 'my_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
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
    }
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
