import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Titulo 1',
      description: 'Este es el primer titulo de todos',
    },
  ];

  getAll() {
    return this.tasks;
  }
  createTask(task: CreateTaskDto) {
    const newTask = {
      id: this.tasks.length + 1,
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  }
}
