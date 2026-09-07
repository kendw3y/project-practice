import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './common/transform-response/transform-response.interceptor';



@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [
    {
      provide:APP_INTERCEPTOR,
      useClass:TransformResponseInterceptor
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
