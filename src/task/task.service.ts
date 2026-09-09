import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskQueryDto } from './dto/get-task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  private tasks: Task[] = [];

  async getAll(query: GetTaskQueryDto) {
    const qb = this.taskRepository.createQueryBuilder('task');
    if (query.status) {
      qb.andWhere('task.status = :status', { status: query.status });
    }
    if (query.search) {
      const searchTerm = query.search.trim();
      qb.andWhere('task.title LIKE :search OR task.description LIKE :search', {
        search: `%${searchTerm}%`,
      });
    }
    const [result, total] = await qb.getManyAndCount();
    return {
      result,
      total,
    };
  }
  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = {
      ...createTaskDto,
      status: TaskStatus.PENDING,
    };
    return this.taskRepository.save(newTask);
  }
  async updateTask(id: number, taskUpdated: UpdateTaskDto) {
    const task = this.taskRepository.findOneBy({id});
    if(!task){
      throw new NotFoundException(`Tarea con id ${id} no encontrado`)
    }
    return this.taskRepository.update({id},taskUpdated)
      
    
    
  }
}
