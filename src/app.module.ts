import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';



@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
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
