import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}
  private tasks: Task[] = [];

  async getAll(){
    return this.taskRepository.find();
  }
  async createTask(createTaskDto: CreateTaskDto){
    const newTask = {
      ...createTaskDto,
      status: TaskStatus.PENDING,
    }
    return this.taskRepository.save(newTask);
  }

}
